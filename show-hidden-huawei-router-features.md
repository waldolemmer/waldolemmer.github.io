---
description: >
    Using your browser to reveal hidden settings such as DHCP DNS server
    addresses and LTE bands.
---

# Show hidden Huawei router features

Huawei reuses the same interface for many of their routers, but chooses to hide
some features. Some of these may not be supported by the hardware, but others
may work fine.

The features are hidden using the HTML `hidden` attribute. To turn this
attribute off for all elements on a page, open your browser's dev tools and
type `$('#*').show()` into the console.

On my B315, this allows me to change the DNS server addresses sent via DHCP:

![DNS and fallback DNS text fields][image]

[image]: show-hidden-huawei-router-features.png
