# Error: creating UInputDevice from /dev/input/event caused by ENOENT

You might be facing the following error:

```
Started evremap.service.
 2023-11-07T17:23:35.800 ERROR evremap > Short delay: release any keys now!
Error: creating UInputDevice from /dev/input/event22
Caused by:
    ENOENT: No such file or directory
evremap.service: Main process exited, code=exited, status=1/FAILURE
evremap.service: Failed with result 'exit-code'.
evremap.service: Scheduled restart job, restart counter is at 192.
Stopped evremap.service.
```

If so, make sure the `uinput` module is loaded (`sudo modprobe uinput`). If
you're rocking a custom kernel, make sure `CONFIG_INPUT_UINPUT` is set to `m`
or `y`.
