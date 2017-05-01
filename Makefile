install: install-deps 

run:
	npm run babel-node -- 'src/bin/gendiff.js' $1 $2 $3

install-deps:
	yarn

build:
	rm -rf dist
	npm run build

test:
	npm test

test-watch:
	npm run testwatch

lint:
	npm run eslint -- src __tests__

publish:
	npm publish

.PHONY: test __tests__
