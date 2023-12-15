# INACCESSIBLE_BOOT_DEVICE in Windows when booting from USB

1. Press Win+R.
2. Type 'regedit' and press Enter.
3. Type `HKLM\SYSTEM\HardwareConfig\` in the address bar at the top.
4. Enter each folder and set`BootDriverFlags` to 0x14.
