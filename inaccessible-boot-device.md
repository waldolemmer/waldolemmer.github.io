---
description: >
    How to fix the INACCESSIBLE_BOOT_DEVICE blue screen of death (BSOD) when
    trying to boot off a Windows USB.
---

# INACCESSIBLE_BOOT_DEVICE in Windows when booting from USB

1. Press Win+R.
2. Type 'regedit' and press Enter.
3. Type `HKLM\SYSTEM\HardwareConfig\` in the address bar at the top.
4. Enter each folder and set`BootDriverFlags` to 0x14.
