#!/bin/bash
# Make sure a process is always running.
# Put the next line into `crontab -e`
# * * * * /home/zhdan/draka_quality_control/run_server.sh >> /home/zhdan/run_server.log 2>&1

process="meteor"

export NODE_TLS_REJECT_UNAUTHORIZED=0
export MONGO_URL=mongodb://127.0.0.1/meteor

TIME="$(date +%Y-%m-%d_%H:%M:%S)"

if ps ax | grep -v grep | grep $process > /dev/null
then
    echo "$TIME Meteor already running"
    exit
else
    echo "$TIME Start meteor server"
    (cd /home/zhdan/draka_quality_control && sudo NODE_TLS_REJECT_UNAUTHORIZED=0 MONGO_URL=mongodb://127.0.0.1/meteor /usr/local/bin/meteor run -p 80 --production >> "/home/zhdan/meteor_logs/run_$TIME.log") &
fi

exit


