test:
	./node_modules/.bin/mocha \
		--reporter spec

dev:
	~/scripts/launch-app.sh

.PHONY: test
