#!/bin/bash 

THIS_PID=$$
# start mongodb
mongod --dbpath ./data/db/ &

# monitor node js app and atuo restart on directory/file changes
supervisor -w app.js,routes,models -e 'js' app.js &

echo "Run this to kill the script"
echo "kill -TERM -$THIS_PID"
echo ""

echo "kill -TERM -$THIS_PID" | pbcopy

# init guard file for livereload
guard
