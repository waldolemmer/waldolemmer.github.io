---
sidebar_position: 1
title: Profiling local LLMs
description: A guide to measuring and understanding the performance of large language models running on local hardware.
image: ./social-card.png
---

Profiling an inference engine such as `llama.cpp` reveals the structural limits of the underlying hardware. Identifying the exact computational bottleneck allows system administrators to adjust parameters and maximize token generation speeds. Performance tuning requires tracking compute utilization, memory bandwidth, and bus transfer rates across both the CPU and the GPU.

## Monitoring GPU limitations

The most effective way to observe continuous GPU behavior is by polling the hardware sensors. Running a dedicated monitoring daemon exposes real-time bottlenecks.

```bash
nvidia-smi dmon -s ut
```

This command reports streaming multiprocessor utilization, memory bandwidth consumption, and PCIe bus traffic. Comparing the `sm` and `mem` columns exposes whether the engine is starved for compute or memory bandwidth.

The values reflect distinct phases of operation. During prompt processing, the engine ingests context in bulk, allowing for massive parallel matrix multiplications. This phase is heavily compute bound and typically pushes the `sm` metric to its limit. If the `mem` metric spikes during prompt processing instead, the batch size is likely too small to sufficiently saturate the compute cores.

Conversely, the text generation decode phase requires fetching the entire model structure just to output a single token. This phase heavily taxes memory pipelines, making the `mem` metric the natural bottleneck.

Looking at the highest value between `sm` and `mem` provides the true hardware usage. If neither metric approaches maximum capacity, the GPU is starved for work. This state strongly indicates that the CPU is bottlenecking the overall sequence and failing to deliver data fast enough. Adjusting the `ub` parameter provides a mechanism to correct this imbalance by modifying how chunks of work are structured before submission to the hardware.

When analyzing hybrid CPU/GPU inference, offloading specific operations profoundly changes behavior. For instance, when `llama.cpp` inference batch sizes reach 32, the engine shifts its operation offloading strategy for optimal throughput. This drastically alters PCIe traffic.

```text {3-4}
# gpu     sm    mem    enc    dec    jpg    ofa  rxpci  txpci
# Idx      %      %      %      %      %      %   MB/s   MB/s
    0     12      2      0      0      0      0   6269    958
    0     15      3      0      0      0      0   6580   1248
    0     82     85      0      0      0      0    375      2
```

The highlighted lines demonstrate a classic PCIe bus bottleneck during prompt processing at large batch sizes. The `sm` and `mem` utilization remains extremely low because the processor is waiting for tensors to cross the motherboard. Once the initial context is ingested, generative phase metrics stabilize into high `sm` compute utilization with nominal bus traffic.

## Tracking CPU execution

While the GPU handles parallelized matrix multiplications, the CPU manages orchestration and non-offloaded operations. System operators utilize native performance counters to inspect execution paths.

```bash
perf stat -p $(pidof llama-server)
```

Hitting `Ctrl+C` terminates the capture and prints a summary block detailing the precise behavior of the integrated circuitry.

```text {4}
          53298.03 msec task-clock #    5.019 CPUs utilized
             16905      page-faults #  317.179 /sec
      166668425222      cycles #    3.127 GHz (83.37%)
       87929863385      stalled-cycles-backend #   52.76% backend cycles idle (83.27%)
      319983765625      instructions #    1.92  insn per cycle
          54829251      branch-misses #    0.28% of all branches (83.33%)

      10.619363786 seconds time elapsed
```

The high rate of backend idle cycles highlights a pipeline stall, but aggregating the data creates ambiguity. The CPU cores might be actively waiting for the memory controller to deliver weights from system RAM due to latency issues. Alternatively, the thread might simply be polling CUDA and spinning in place while waiting for the GPU to complete a dispatched task.

To clarify exactly what the processor is doing, tracing the live execution functions provides immediate visibility.

```bash
perf top
```

This live view displays a real-time list of functions consuming CPU cycles.

```text {4-5}
Samples: 98K of event 'cycles:P', 4000 Hz, Event count (approx.): 73393518981 lost: 0/0 drop: 0/0
Overhead  Shared Object Symbol
  18.48%  libggml-cpu.so.0.15.1 [.] ggml_vec_dot_q8_0_q8_0
  17.39%  libggml-base.so.0.15.1 [.] dequantize_row_q8_0
  10.76%  libggml-cpu.so.0.15.1 [.] ggml_compute_forward_flash_attn_ext
   2.18%  libggml-cpu.so.0.15.1 [.] ggml_vec_dot_q4_K_q8_K
```

Observing heavy dequantization workloads in the highlighted lines confirms that memory access and CPU math limits are the active constraints. If the top functions pertained to GPU synchronization instead, the CPU would be verified as waiting on hardware acceleration.

## Managing memory pressure

Running massive language models on constrained hardware demands placing weights in standard system RAM alongside VRAM. If the combined system RAM and VRAM footprint exceeds physical limits, the operating system pages inactive memory blocks to the storage drive. Dipping into swap space completely halts token generation speeds.

Linux tracks stall times caused by resource starvation natively through the pressure stall information subsystem.

```bash
cat /proc/pressure/memory
```

The output contains metrics specifying the percentage of time that hardware threads spent waiting for memory pages to load.

```text {2}
some avg10=2.60 avg60=1.22 avg300=1.28 total=418946248
full avg10=38.45 avg60=12.22 avg300=2.27 total=417973350
```

The heavily elevated `avg10` value on the highlighted `full` line confirms the system is actively thrashing the swap file. Entire processes are locked waiting for storage IO. Mitigating this memory exhaustion requires reducing the engine context size or selecting smaller parameter models.

## Hybrid architectures and MoE

Mixture of Experts models introduce highly specialized configurations for hybrid deployments. Inference engines load distinct experts into memory to handle separated generation steps. Under limited RAM and VRAM conditions, administrators must precisely orchestrate offload locations to prevent models from plunging the system into swap starvation.

Two primary flags govern this behavior in `llama.cpp` environments:

* `cpu-moe`: Forces all expert nodes to reside in system RAM.
* `n-cpu-moe`: Defines the exact number of experts pinned to the CPU instead of the GPU.

Keeping active base layers on the GPU while shifting less frequent experts to the CPU prevents absolute out-of-memory errors. Tuning these components avoids triggering severe memory pressure stalls and stabilizes long-term generation latency.

:::tip[Hardware specifications]
Always map the PCIe generation of the motherboard to the physical lanes supporting the GPU. Running a 16-lane inference card on an electrically limited 8-lane physical slot compounds data transfer bottlenecks during intensive batch operations.
:::
