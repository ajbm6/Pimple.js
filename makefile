test:
	@node_modules/.bin/mocha -R list
	@make commit
install:
	@npm install
commit:
	@git add .
	@git commit -am"auto-commit `date`" || :
push: build commit
	@git push github --all
build:
	@uglifyjs pimple.js -o pimple.min.js --source-map pimple.js.map --comments
.PHONY:test