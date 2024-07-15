start:
	cd frontend && npm run build
	cp -a ./frontend/dist/* ./backend/src/main/resources/public
	cd backend && ./gradlew bootRun