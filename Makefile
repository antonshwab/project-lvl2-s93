# install: install-deps install-flow-typed

install: install-deps 

run:
	npm run babel-node -- 'src/bin/gendiff.js' $1 $2 $3

install-deps:
	yarn

# install-flow-typed:
# 	npm run flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

test-watch:
	npm run testwatch

# check-types:
# 	npm run flow

lint:
	npm run eslint -- src

publish:
	npm publish

.PHONY: test __tests__
