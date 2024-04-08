# Editing the `emerge --resume` database (with a text editor)

When you run `emerge --resume`, emerge looks at `/var/cache/edb/mtimedb` to
find the most recent entry in the resume list. Don't worry about the scary name
--- this is just a JSON file with the following format:

```json
{
	"info": { ... },
	"ldpath": { ... },
	"resume": { ... },
	"resume_backup": { ... },
	"starttime": 0,
	"updates": { ... },
	"version": "3.0.61"
}

```
`resume` and `resume_backup` are the keys we're interested in.

## Delete the most recent entry

If you've recently tried to update or reinstall a bunch of packages (say, with
`emerge --emptytree @world`), but emerge's process got interrupted, you no
doubt want to resume this emerge at a later time. In the meantime, however, you
might want to merge another package. No problem --- if emerge fails to merge
this package, it will back up `emerge --emptytree @world`'s progress into
`resume_backup` and store the new command's progress in `resume`. A call to
`emerge --resume` will try to merge the new package again. If this fails,
`resume` will be updated to contain the new progress (if progress was made). If
it succeeds, `resume_backup` contents get moved into `resume`, whose contents
get overwritten. If you've dabbled in programming, you should realize that this
is just the world's shortest fixed-length stack.

But what if the second merge failed because you entered the wrong command?
Well, if you tried to correct this mistake by running a different command, and
this command failed, its progress would get pushed to the top of the stack. Or,
in English, the new command's progress would get stored in `resume`, whose old
contents (the previous failed attempt's progress) would get stored in
`resume_backup`, whose old contents (`emerge --emptytree @world`'s progress)
would get discarded. This is no good!

There is a simple fix for this: Move the contents of `resume_backup` to
`resume` by yourself. This emulates a successful run of `emerge --resume`.

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

