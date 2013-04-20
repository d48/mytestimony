test:
	./node_modules/.bin/mocha \
		--reporter spec

startapp: 
	bin/start-app.sh 

stopapp:
	bin/stop-app.sh

.PHONY: test
