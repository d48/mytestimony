#!/bin/bash  

# prints first column from output of jobs
# JOBLINE=`ps ax | grep [bin/start]-app.sh | awk '{print $1}'`
JOBLINE=`ps ax | grep "[npm] start" | awk '{print $1}'`

echo "running kill -TERM -${JOBLINE}"
kill -TERM -${JOBLINE}
exit 1
