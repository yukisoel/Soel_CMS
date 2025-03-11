SHELL := /bin/bash

start:
	cd frontend && npm run build
	test -d ./backend/src/main/resources/public & rm -rf ./backend/src/main/resources/public
	test ! -d ./backend/src/main/resources/public & mkdir -p ./backend/src/main/resources/public
	cp -a ./frontend/dist/* ./backend/src/main/resources/public
	cd backend && source .env && ./gradlew bootRun --args='--spring.profiles.active=local-integration'

backend_start:
	cd backend && source .env && ./gradlew bootRun

build:
	cd frontend && npm install
	cd frontend && npm run build
	test -d ./backend/src/main/resources/public & rm -rf ./backend/src/main/resources/public
	test ! -d ./backend/src/main/resources/public & mkdir -p ./backend/src/main/resources/public
	cp -a ./frontend/dist/* ./backend/src/main/resources/public
	cd backend && source .env && ./gradlew build

build_for_actions:
	cd frontend && npm install
	cd frontend && npm run build
	test -d ./backend/src/main/resources/public & rm -rf ./backend/src/main/resources/public
	test ! -d ./backend/src/main/resources/public & mkdir -p ./backend/src/main/resources/public
	cp -a ./frontend/dist/* ./backend/src/main/resources/public
	cd backend && ./gradlew build

submit:
	make build
	git push