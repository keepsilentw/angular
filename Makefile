start: in
	npm run start

in:
	@bower install
	@npm install --registry=http://registry.npm.taobao.org

build: in
	npm run build
