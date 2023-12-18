---
description: "I've dug through many drivers to find this."
---
# RTL8192EU: driver with monitor mode and packet injection support

I've dug through many drivers for my TP-Link TL-WN823N adapter, which uses the rtl8192eu chip, but the only working one with monitor mode and packet injection support I could find was [from clnhub](https://github.com/clnhub/rtl8192eu-linux) (branch 5.11.2.1, but supports all later versions as of the time of writing).

Make sure to read the README.
