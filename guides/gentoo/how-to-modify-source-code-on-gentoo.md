---
sidebar_position: 5
description: >
    Changing the source code of a package on Gentoo Linux – the right way.
---

# How to modify source code on Gentoo

The cool thing about Gentoo is that you can modify a package's source code as
you see fit and Portage will still manage that package for you. This is done
using patches. Modifying the sources directly won't work, as emerge will
re-fetch the package.

For this example, I'll modify
[sys-process/btop-1.1.2](https://github.com/gentoo-mirror/gentoo-zh/tree/master/sys-process/btop).

## Preparing and modifying the sources

1. Fetch the sources with `emerge --fetchonly btop`
2. Extract them to a/ and b/ (don't use any other names) in the current
   directory:

   ```bash
   tar xf /var/cache/distfiles/btop-1.1.2.tar.gz -C a
   tar xf /var/cache/distfiles/btop-1.1.2.tar.gz -C b
   ```

3. Modify the sources in b/ as you see fit. Don't touch a/.

## Generating a patch

A patch is just the `diff -ru` between the original package and the modified
version. The patch may be called anything, but must have a `.patch` or `.diff`
extension

Generate the patch:

```bash
mkdir -p                /etc/portage/patches/sys-process/btop-1.1.2
touch                   /etc/portage/patches/sys-process/btop-1.1.2/lowerdelay.patch
diff -ru a b | sudo tee /etc/portage/patches/sys-process/btop-1.1.2/lowerdelay.patch >/dev/null
```

## Applying the patch

Re-emerge the package: `emerge -1 btop`. You should see something like:

```
 * Messages for package sys-process/btop-1.1.2:

 * User patches applied.
```

## Additional reading

- [/etc/portage/patches - Gentoo wiki](https://wiki.gentoo.org/wiki//etc/portage/patches)
- [Doing it myself or: How I Learned to Stop Worrying and Love Userpatches. : r/Gentoo](https://www.reddit.com/r/Gentoo/comments/rggsiy/doing_it_myself_or_how_i_learned_to_stop_worrying/)
