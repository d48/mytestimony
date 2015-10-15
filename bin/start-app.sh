#!/bin/bash 

# start mongodb
mongod --dbpath ./data/db/ --smallfiles &

# monitor node js app and auto restart on directory/file changes
./node_modules/forever/bin/forever start app.js
