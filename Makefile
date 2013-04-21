test:
	./node_modules/.bin/mocha \
		--reporter spec

startapp: 
	bin/start-app.sh 

startappdev: 
	bin/start-app-dev.sh 

stopapp:
	bin/stop-app.sh

.PHONY: test
