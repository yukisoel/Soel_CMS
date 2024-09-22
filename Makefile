start:
	cd frontend && npm run build
	#test ! -d ./backend/src/main/resources/public && mkdir -p ./backend/src/main/resources/public
	cp -a ./frontend/dist/* ./backend/src/main/resources/public
	cd backend && source .env && ./gradlew bootRun

backend_start:
	cd backend && source .env && ./gradlew bootRun

build:
	cd frontend && npm run build
	#test ! -d ./backend/src/main/resources/public && mkdir -p ./backend/src/main/resources/public
	cp -a ./frontend/dist/* ./backend/src/main/resources/public