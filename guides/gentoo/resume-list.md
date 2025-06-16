---
sidebar_position: 3
title: Editing the emerge --resume database
description: Editing emerge's resume database in Gentoo Linux, for example to
             back up your merge progress or cancel the last merge.
---
# Editing the `emerge --resume` database (with a text editor)

When you run `emerge --resume`, emerge looks at `/var/cache/edb/mtimedb` to
find the most recent entry in the resume list. Don't worry about the scary name
--- this is just a JSON file with the following format:

```json
{"info": { ... },
 "ldpath": { ... },
 "resume": { ... },
 "resume_backup": { ... },
 "starttime": 0,
 "updates": { ... },
 "version": "3.0.61"}
```

`resume` and `resume_backup` are the keys we're interested in.

## Delete the most recent entry

When emerge fails, it will save the current state of the merge in `resume`. If
there's already an entry there, that entry will be moved to `resume_backup`.

But whatever is already in `resume_backup` is discarded.

There is a simple fix for this: If the contents of `resume_backup` is
important, but `resume` isn't, move the contents of `resume_backup` to `resume`
by yourself. This emulates a successful run of `emerge --resume`.

You'll probably want to back up `/var/cache/edb/mtimedb` before attempting this
change for the first time.

For this example:

```json
"resume": {
    "favorites": [
        "kde-plasma/plasma-pa"
    ],
    "mergelist": [
        [
            "ebuild",
            "/",
            "kde-plasma/plasma-pa-6.0.3",
            "merge"
        ]
    ],
    "myopts": {
        "--regex-search-auto": "y"
    }
},
"resume_backup": {
    "favorites": [
        "@world"
    ],
    "mergelist": [ ... ],
    "myopts": {
        "--emptytree": true,
        "--jobs": 12,
        "--keep-going": true,
        "--regex-search-auto": "y"
    }
},
```

You would delete each line from `"favorites": [` to `"resume_backup": {`:

```json
"resume": {
    "favorites": [
        "@world"
    ],
    "mergelist": [ ... ],
    "myopts": {
        "--emptytree": true,
        "--jobs": 12,
        "--keep-going": true,
        "--regex-search-auto": "y"
    }
},
```
