---
sidebar_position: 4
title: Chroot installation
description: How to temporarily install Gentoo on any operating system without
             replacing the OS, by installing it in a chroot directory.
---
# Setting up a Gentoo chroot environment on any OS

<!-- Choices:

     - Directory name
     - Stage archive -->

## Steps

1. Create and enter a directory for the chroot environment, for example,
   `host/`.
2. Choose a stage archive from [get.gentoo.org]. For a chroot system, the
   following are required:
   - **Architecture:** Should be the same as the host device (e.g. amd64).
   - **Init system:** Any init system is fine (OpenRC or systemd).
   - **C library:** Any C library is fine (musl or glibc).
   - **Multilib:** Not required, unless 32-bit applications are required (WINE
     or Steam).
   - **Desktop:** Not required, unless graphical applications are required
     (e.g. Firefox).
3. Download the stage file into your chroot directory (Handbook:
   [Alpha][handbook-alpha-downloading] [AMD64][handbook-amd64-downloading]
   [HPPA (PA-RISC)][handbook-hppa-downloading]
   [MIPS][handbook-mips-downloading] [PowerPC][handbook-ppc-downloading]
   [PPC64][handbook-ppc64-downloading] [SPARC][handbook-sparc-downloading]
   [x86][handbook-x86-downloading]).
4. Extract the stage file (Handbook:
   [Alpha][handbook-alpha-installing] [AMD64][handbook-amd64-installing]
   [HPPA (PA-RISC)][handbook-hppa-installing]
   [MIPS][handbook-mips-installing] [PowerPC][handbook-ppc-installing]
   [PPC64][handbook-ppc64-installing] [SPARC][handbook-sparc-installing]
   [x86][handbook-x86-installing]).

```bash
# As root, in any directory:

CHROOT_DIR=host
STAGE_ARCHIVE=https://distfiles.gentoo.org/releases/amd64/autobuilds\
/20250601T163943Z/stage3-amd64-musl-20250601T163943Z.tar.xz
TIME=061312182025 # MMDDhhmmYYYY

mkdir -- "$CHROOT_DIR"
cd -- "$CHROOT_DIR"
wget -- "$STAGE_ARCHIVE"

# If the machine's date is not set correctly (e.g. a live USB)
date -- "$TIME"

tar --extract --preserve-permissions --file stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

[get.gentoo.org]: https://get.gentoo.org
[handbook-alpha-downloading]: https://wiki.gentoo.org/wiki/Handbook:Alpha/Installation/Stage#Downloading_the_stage_file
[handbook-amd64-downloading]: https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Stage#Downloading_the_stage_file
[handbook-hppa-downloading]: https://wiki.gentoo.org/wiki/Handbook:HPPA/Installation/Stage#Downloading_the_stage_file
[handbook-mips-downloading]: https://wiki.gentoo.org/wiki/Handbook:MIPS/Installation/Stage#Downloading_the_stage_file
[handbook-ppc-downloading]: https://wiki.gentoo.org/wiki/Handbook:PPC/Installation/Stage#Downloading_the_stage_file
[handbook-ppc64-downloading]: https://wiki.gentoo.org/wiki/Handbook:PPC64/Installation/Stage#Downloading_the_stage_file
[handbook-sparc-downloading]: https://wiki.gentoo.org/wiki/Handbook:SPARC/Installation/Stage#Downloading_the_stage_file
[handbook-x86-downloading]: https://wiki.gentoo.org/wiki/Handbook:X86/Installation/Stage#Downloading_the_stage_file
[handbook-alpha-installing]: https://wiki.gentoo.org/wiki/Handbook:Alpha/Installation/Stage#Installing_a_stage_file
[handbook-amd64-installing]: https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Stage#Installing_a_stage_file
[handbook-hppa-installing]: https://wiki.gentoo.org/wiki/Handbook:HPPA/Installation/Stage#Installing_a_stage_file
[handbook-mips-installing]: https://wiki.gentoo.org/wiki/Handbook:MIPS/Installation/Stage#Installing_a_stage_file
[handbook-ppc-installing]: https://wiki.gentoo.org/wiki/Handbook:PPC/Installation/Stage#Installing_a_stage_file
[handbook-ppc64-installing]: https://wiki.gentoo.org/wiki/Handbook:PPC64/Installation/Stage#Installing_a_stage_file
[handbook-sparc-installing]: https://wiki.gentoo.org/wiki/Handbook:SPARC/Installation/Stage#Installing_a_stage_file
[handbook-x86-installing]: https://wiki.gentoo.org/wiki/Handbook:X86/Installation/Stage#Installing_a_stage_file

