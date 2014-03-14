#!/bin/bash 

THIS_PID=$$
# start mongodb
mongod --dbpath ./data/db/ --smallfiles &

# monitor node js app and auto restart on directory/file changes
./node_modules/forever/bin/forever start app.js &

echo "Run this to kill the script"
echo "kill -TERM -$THIS_PID"
echo ""

echo "kill -TERM -$THIS_PID" | pbcopy

# init guard file for livereload
guard
