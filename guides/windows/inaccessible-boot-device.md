---
title: INACCESSIBLE_BOOT_DEVICE when booting from USB
description: How to fix the INACCESSIBLE_BOOT_DEVICE blue screen of death
             (BSOD) when trying to boot off a Windows USB.
image: '/img/windows-social-card.png'
---

# [Solved] INACCESSIBLE\_BOOT\_DEVICE when booting from USB

According to [this][1] thread, the USB 3.0 drivers aren't loaded at the stage
of the boot process where Windows tries to access the boot partition.

To make Windows load the USB drivers sooner:

1. Press Win+R, type 'regedit' and press Enter.
2. Enter `HKLM\SYSTEM\HardwareConfig\` in the address bar at the top.
3. Enter each folder and set `BootDriverFlags` to 14 (hexadecimal).

[1]: https://www.tenforums.com/installation-upgrade/16148-can-i-boot-windows-hdd-via-usb-inaccessible_boot_device.html
