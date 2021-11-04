## Prerequisites

- meteor (current version still run old versions also)
- private/andmed.txt

## Run dev server

```
meteor
```

## Project structure

- client: frontend
- server: backend
- both: runs on both ends
- both/settings.js: configuration of app internals
- lib: database collections

## Deployment

A little history. This app was first deployed with 'mup' [meteor-up](https://github.com/arunoda/meteor-up-legacy), but it has changed a lot and for some reason even the local install got broken. New version wants Docker, but apt is broken. Apt can't be fixed without full distro upgrade apparently. Going to Ubuntu 16 failed with kernel panic and restoring a backup was the only option. so **don't try to update the server**. One problem is that /boot is too small for the upgrade.

So currently we just run 'meteor --production' in the server like this:

1. Cron starts run_server.sh every minute.
1. run_server.sh starts meteor, but only if it's not already running.
1. The script logs to ~/run_server.log
1. The meteor server logs to ~/meteor_logs/run_DATE.log

To update files just scp in the new ones and check that changes updated into the server. run_server.sh is also updated. However if you scp from Windows to Ubuntu the run_server.sh seems to break because of newline and you need to [replace it](https://stackoverflow.com/questions/14219092/bash-script-and-bin-bashm-bad-interpreter-no-such-file-or-directory).

## Old deploying notes (deprecated)

You should only need to `bash mup/redeploy.sh`, but there are problems.
- `git pull` may not work so use `scp`
- if MongoDB install fails: mup overwrites `/etc/apt/sources.list.d/mongodb.list` with an URL that's offline. Google for `mongodb trusty` and insert the `sources.list` value manually. You may have to GPG receive keys manually. For convenience there's `sudo cp /etc/apt/mongodb.list.correct /etc/apt/sources.list.d/mongodb.list`.
- proxies should be configured, but if some connection fails you have to set http-proxy for that specific service.
