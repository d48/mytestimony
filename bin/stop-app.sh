#!/bin/bash  

# prints first column from output of jobs
# JOBLINE=`ps ax | grep [bin/start]-app.sh | awk '{print $1}'`
# JOBLINE=`ps ax | grep "[npm] start" | awk '{print $1}'`
JOBLINE=`ps ax | grep npm | awk '{print $1}' | head -n1`
FOREVER=`ps ax | grep forever | awk '{print $1}' | head -n1`

echo "running kill -TERM -${JOBLINE}"
kill -TERM -${JOBLINE}

echo "killing forever running kill ${FOREVER}"
kill ${FOREVER}

APPJS=`ps ax | grep app.js | awk '{print $1}' | head -n1`
echo "killing app.js running kill ${APPJS}"
kill ${APPJS}

exit 1
