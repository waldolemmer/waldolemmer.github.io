---
description: Most drivers either don't work with modern Linux kernels or don't
             support both monitor mode AND packet injection. But I've finally
             found one that works.
image: '/img/rtl8192eu-social-card.png'
---
# RTL8192EU: driver with monitor mode and packet injection support

I've dug through many drivers for my TP-Link TL-WN823N adapter, which uses the
rtl8192eu chip, but the only working one with monitor mode and packet injection
support I could find was [from clnhub][1]. It's on branch 5.11.2.1, but
it supports all later versions of the Linux kernel as of the time of writing.

Make sure to read the README.

[1]: https://github.com/clnhub/rtl8192eu-linux
