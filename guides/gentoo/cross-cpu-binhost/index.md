---
sidebar_position: 2
title: Set up a binhost for another CPU
description: Set up a Gentoo binary package repository with custom CFLAGS (e.g.
             -march=native) and a custom make.conf and Portage profile.
---

import Image from '@theme/IdealImage'

# Setting up a Gentoo Binary Package Repository with a Custom Portage Configuration

After completing this guide, users will be able to build binary packages
tailored to a target system, while only running the build tools on the host
system.

Specifically, packages may be built with CFLAGS and USE flags tailored to the
target's CPU, even if that makes them incompatible with the host's CPU.

<Image alt='./emerge-for-target.sh, triggering two emerge runs (one on the host
           for the binhost and one on the target), followed by a command that
           prints the binhost&#39;s CFLAGS'
       img={require('./emerge-script-output.png')} />

## Requirements

- A host device:
  - with the same CPU architecture as the target device (e.g. amd64)
  - that is powerful enough to compile packages
  - with a Gentoo installation.
      - `emerge`, along with a few build tools, from this environment will be
        used to build packages.
      - If a Gentoo installation is not available, [set up a Gentoo chroot
        environment](../chroot-any-os). Multilib and desktop support are not
        needed, the init system does not matter and musl is fine.
- A target device

## Host setup

The binary packages can't be built directly in the host's Gentoo installation,
since the host may have different settings and a different world set than the
target. Thus, a separate environment needs to be set up. This environment will
mimic the target's environment.

### Setting up the binhost's environment

First, [set up a Gentoo chroot environment](../chroot-any-os) inside the host's
Gentoo installation (say, at `/binhost/`). The stage file should contain the
same init system, C library and level of multilib support as the target.

This environment will serve the following purposes:
- It will store the world file and Portage configuration used to build the
  binary packages.
- It will store the built binary package files.
- Those packages will be installed in this environment.
- **No software in this environment will be run directly.**

```bash
CHROOT_DIR=binhost
STAGE_ARCHIVE=https://distfiles.gentoo.org/releases/amd64/autobuilds\
/20250601T163943Z/stage3-amd64-musl-20250601T163943Z.tar.xz

mkdir -- "$CHROOT_DIR"
cd -- "$CHROOT_DIR"
wget -- "$STAGE_ARCHIVE"

tar --extract --preserve-permissions --file stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

<Image alt='root@host / # ls binhost
            bin   dev  home  lib64  mnt  proc  run
            stage3-amd64-nomultilib-systemd-20250608T165347Z.tar.xz  tmp  var
            boot  etc  lib   media  opt  root  sbin  sys usr'
       img={require('./ls-from-binhost.png')} />


### Hosting the binary package repository

By default, binary packages are stored in `/var/cache/binpkgs/`. Being a binary
package host means exposing this directory to other device(s) (the target in
this case).

The easiest way to do this without installing any additional software is using
Python's built-in HTTP server:

```bash
PORT=$RANDOM
python -m http.server --directory /binhost/var/cache/binpkgs/ $PORT
```

<Image alt='The above commands, with the following output:
            Serving HTTP on 0.0.0.0 port 25888 (http://0.0.0.0:25888/)
            ...'
       img={require('./http-server-from-binhost.png')} />

:::tip[Alternatives to Python's HTTP server]
The [official Gentoo wiki][wiki-setup-binhost] has a list of alternative ways
to share the `binpkgs` directory with the target.

[wiki-setup-binhost]: https://wiki.gentoo.org/wiki/Binary_package_guide#Setting_up_a_binary_package_host
:::

:::warning[Open ports]
If the user can access these files from http://[[public IP][wimp]]:[port]/,
then anyone can. This should be a temporary setup to get the target
bootstapped.

Once the binhost has been set up, the port should be closed to the public using
a firewall, and a secure private connection should be established between the
two devices using something like [Tailscale VPN][tailscale].

[wimp]: https://whatismyipaddress.com/
[tailscale]: https://tailscale.com
:::

:::note[NAT and carrier-grade NAT (CGNAT)]
Many users will be behind NAT or CGNAT, which means that outside devices cannot
establish connections with the host. In this case, the host can temporarily use
a tunnel such as [Tailscale funnel][tailscale] or [Cloudflare
Tunnel][cf-tunnel] to expose the HTTP server to the internet.

[cf-tunnel]: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
:::

## Target setup

### Portage configuration

In order for binary packages compiled for the binhost to be installable on the
target, both need to have the same configuration.

Ensure that `/binhost/` and the target have the same Portage
configuration (`/etc/portage/`, `/var/lib/portage/world` and
`/var/lib/portage/world_sets`). The configuration can be sent from one
machine to the other using `scp`, as long as the `sshd` service is running
on the receiver and is accessible over the network.

```bash
# Copying from the host to the target while logged in on the host
scp -r /binhost/etc/portage/ root@target:/etc/
scp -r /binhost/var/lib/portage/world* root@target:/var/lib/portage/

# Copying from the host to the target while logged in on the target
scp -r root@host:/binhost/etc/portage/ /etc/
scp -r root@host:/binhost/var/lib/portage/world* /var/lib/portage/

# Copying from the target to the host while logged in on the host
scp -r root@target:/etc/portage/ /binhost/etc/
scp -r root@target:/var/lib/portage/world* /binhost/var/lib/portage/

# Copying from the target to the host while logged in on the target
scp -r /etc/portage/ root@host:/binhost/etc/
scp -r /var/lib/portage/world* root@host:/binhost/var/lib/portage/
```

If the target's Portage configuration is still the default, now is the time
to configure it (either on the target, or on the binhost) (Handbook:
[Alpha][handbook-alpha-configuration] [AMD64][handbook-amd64-configuration]
[HPPA (PA-RISC)][handbook-hppa-configuration]
[MIPS][handbook-mips-configuration] [PowerPC][handbook-ppc-configuration]
[PPC64][handbook-ppc64-configuration] [SPARC][handbook-sparc-configuration]
[x86][handbook-x86-configuration]).

[handbook-alpha-configuration]: https://wiki.gentoo.org/wiki/Handbook:ALPHA/Installation/Stage#Configuring_compile_options
[handbook-amd64-configuration]: https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Stage#Configuring_compile_options
[handbook-hppa-configuration]: https://wiki.gentoo.org/wiki/Handbook:HPPA/Installation/Stage#Configuring_compile_options
[handbook-mips-configuration]: https://wiki.gentoo.org/wiki/Handbook:MIPS/Installation/Stage#Configuring_compile_options
[handbook-ppc-configuration]: https://wiki.gentoo.org/wiki/Handbook:PPC/Installation/Stage#Configuring_compile_options
[handbook-ppc64-configuration]: https://wiki.gentoo.org/wiki/Handbook:PPC64/Installation/Stage#Configuring_compile_options
[handbook-sparc-configuration]: https://wiki.gentoo.org/wiki/Handbook:SPARC/Installation/Stage#Configuring_compile_options
[handbook-x86-configuration]: https://wiki.gentoo.org/wiki/Handbook:X86/Installation/Stage#Configuring_compile_options


:::warning[-march=native]
`-march=native` optimizes for the CPU that the compiler is currently running
on, which is the host's CPU, not the target's. Packages produced this way will
most likely not run on the target.

Run the following command **on the target** to see what
`-march=native` evaluates to:

```bash
gcc -v -E -x c -march=native -c /dev/null -o /dev/null 2>&1 | grep /cc1 | grep mtune
```
:::

<Image alt='root@host / # cd binhost/
            root@host /binhost # tar c etc/portage/ var/lib/portage/world* |
            sha256sum
            c88...  -'
       img={require('./host-sha256sum.png')} />
<Image alt='target / # tar c etc/portage/ var/lib/portage/world* | sha256sum
            c88...  -'
       img={require('./target-sha256sum.png')} />

#### Adding the binhost to the target

The target will need to know where to download the binary packages from. Add
the HTTP server's URL to `/etc/portage/binrepos.conf`:

```conf
[binhost]
sync-uri = http://[ip]:[port]/binhost
priority = 10
```

Replace `[ip]` with the IP address or domain name of the host device and
`[port]` with the port that the HTTP server is listening on. Replace `http`
with `https` if the HTTP server is being accessed through a secure tunnel such
as Tailscale funnel or Cloudflare Tunnel.

See [the official Gentoo wiki][wiki-pulling] for more information.

[wiki-pulling]: https://wiki.gentoo.org/wiki/Binary_package_guide#Pulling_packages_from_a_binary_package_host

## Building packages

### Building packages on the host (for the binhost)

To use the host's Gentoo installation to create binary packages for the binhost
(which will later be copied to the target), run the following command on the
host:

```sh
ROOT=/binhost/ \
PORTAGE_CONFIGROOT=/binhost/ \
PKGDIR=/binhost/var/cache/binpkgs/ \
emerge --buildpkg --root-deps "$@"
```

(`"$@"` is a placeholder for the actual list of packages, along with any
additional arguments for `emerge`).

#### Explanation

- `$ROOT` specifies where the packages will be installed.
- `$PORTAGE_CONFIGROOT` specifies where the Portage configuration
  will be read from. This is the binhost's configuration, which should be the
  same as the target's configuration in order for the binary packages to be
  compatible.
- `$PKGDIR` specifies where the binary packages will be stored.
- `--buildpkg` (`-b`) tells `emerge` to build binary packages and save them in
  `$PKGDIR`, in addition to installing them.
- `--root-deps` ensures that build dependencies are also built for the `$ROOT`
  system (the binhost).

Emerge will automatically build build dependencies on the host system before
attempting to use them to build packages for the binhost. `--root-deps` ensures
that these build dependencies are also built for the binhost, because the
target will need them when installing the binary packages.

### Installing packages on the target

Once built on the binhost, packages can be installed on the target using `sudo
emerge --getbinpkgonly "$@"`.

### Keeping the binhost and target in sync

In order for the environments to remain consistent, emerge commands should be
run on both the binhost and the target. Consider adding the following script to
the host:

```sh
#!/bin/env sh

ROOT=/binhost/ \
PORTAGE_CONFIGROOT=/binhost/ \
PKGDIR=/binhost/var/cache/binpkgs/ \
emerge --buildpkg --root-deps "$@" \
&& ssh -t user@target sudo emerge --getbinpkgonly "$@"
```

`-t` tells `ssh` to allocate a pseudo-terminal, which allows sudo to ask for
the password on the host machine (where the command is run from) instead of on
the target.
