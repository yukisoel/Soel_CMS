start:
	source .env && ./gradlew bootRun

kt2openApiDocs:
	@if lsof -ti :8080 > /dev/null; then \
		echo "Port 8080 is already in use. Please stop the process using this port."; \
		./gradlew generateOpenApiDocs; \
	else \
		echo "Starting bootRun..."; \
		source .env && nohup ./gradlew bootRun > bootrun.log 2>&1 & \
		PID=$$!; \
		echo "Waiting for app to start..."; \
		sleep 10; \
		./gradlew generateOpenApiDocs; \
		echo "Killing bootRun (PID $$PID)"; \
		kill $$PID; \
	fi

build-local:
	source .env && ./gradlew build

build-docker:
	aws ecr get-login-password --region ap-northeast-1 --profile soel_cms | docker login --username AWS --password-stdin 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com
	docker build -t dev-soel-cms .
	docker tag dev-soel-cms:latest 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com/dev-soel-cms:latest
	docker push 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com/dev-soel-cms:latest
	say "ビルドが完了しました"