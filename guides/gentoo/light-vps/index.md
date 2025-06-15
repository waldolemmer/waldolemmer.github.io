---
sidebar_position: 1
title: Lightweight VPS installation
description: Install Gentoo without compiling anything, with custom CFLAGS and USE flags.
image: fastfetch.png
keywords: [gentoo vps, gentoo light vps]
---

import Image from '@theme/IdealImage';

# Installing Gentoo on a Lightweight VPS

This guide explains how to install Gentoo on a target device:
- without running compilers or linkers on it,
- with a user-specified profile and USE flags, and
- with packages optimized for its CPU.

A lightweight VPS is a common use case with these requirements.

Another more powerful device with the same architecture (but potentially a
different CPU) is required.

<Image alt='fastfetch output: OS: Gentoo, Host: KVM, Memory: 1 GiB, Disk: 5.91
            GiB'
       img={require('./fastfetch.png')} />

## Requirements

Two devices are required:
- A target device with:
  - 2 GB RAM.
  - 8 GB disk space.
  - A bootable OS (say, a Gentoo Live USB).
- A device (host) powerful enough to compile packages.

Both devices should share the same CPU architecture (e.g. both should be amd64).

Both devices should have a working internet connection. A fast connection will
help in order to transfer a few hundred megabytes of binary packages. Neither device needs to expose any ports to the internet.

## Steps

### Target device setup

Follow the [Gentoo Handbook][handbook-main] to install and configure Gentoo.
Skip the steps where running `emerge-webrsync` or `emerge --sync` or installing
packages is required.

By the end, the user should be chrooted in on the target disk and have an
internet connection.

<Image alt='ls from / shows layout with stage3, ping a.co shows responses'
       img={require('./target-post-chroot.png')} />

### Binary package repository

[Set up a binary package repository on the host device using the target
device's configuration](../cross-cpu-binhost/).

### Private connection (optional)

Users who prefer to expose as few ports to the internet as possible should set
up a private connection between the host and the target device.

One way that this can be done is by setting up net-vpn/tailscale on both
devices, along with an iptables firewall rule to block inbound connections from
the internet.

### Configuration synchronization

As detailed in [Set up a binhost for another CPU](../cross-cpu-binhost/), the
following files and directories should be synchronized between the host and the
target:

- `/etc/portage/`
- `/var/lib/portage/world`
- `/var/lib/portage/world_sets`

Additionally, users may want to synchronize the following directories:
- `/var/db/repos/gentoo` (so `emerge --sync` only has to be run on one device)
- `/var/cache/binpkgs/` (sync binary packages to the target before the target
  runs `emerge`; speeds up `emerge` runs at the cost of increased disk usage,
  since all dependencies are synced)

Syncthing is probably the best tool for the job, although it does use around
150 MB of RAM while idle.

[handbook-main]: https://wiki.gentoo.org/wiki/Handbook:Main_Page

