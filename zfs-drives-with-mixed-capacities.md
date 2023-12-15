# ZFS: Drives with mixed capacities

The following output of `zpool iostat mypool` shows how data is striped across single drive vdevs of different sizes:

```
              capacity     operations     bandwidth 
pool        alloc   free   read  write   read  write
----------  -----  -----  -----  -----  -----  -----
mypool       171G  4.15T     37     90  5.03M  13.2M
  sda       35.9G   892G      8     22  1.07M  2.77M
  sdb       26.8G   669G      5     16   776K  2.05M
  sdc       63.5G  1.75T     11     25  1.89M  4.89M
  sdd       4.22G  2.78G      1      2   126K   327K
  sde       5.45G  1.55G      1      2   131K   409K
  sdf       35.4G   893G      9     21  1.05M  2.72M
----------  -----  -----  -----  -----  -----  -----
```

The usages (%) are as follows:

|sda|sdb|sdc|sdd|sde|sdf
|---|---|---|---|---|---
|3.9|3.8|3.4|60 |78 |4.0

Notice that the 750G, 1T and 2T hard drives about equally full while the 8G
flash drives are almost full. In general, larger drives have proportionally
more data striped across them, except for very low-latency drives (flash drives
and SSDs), which get filled first. You should therefore ensure that your
largest disks are the fastest, since they will store the most data and will
therefore have the largest impact on the overall throughput.
