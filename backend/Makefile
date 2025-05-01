start:
	source .env && ./gradlew bootRun

kt2openApiDocs:
	@echo "🔄 Starting OpenAPI Docs Generation..."

	@if [ -f apiDocs/openapi.yaml ]; then \
		echo "🧹 Deleting existing openapi.yaml..."; \
		rm apiDocs/openapi.yaml; \
	fi

	@PORT_IN_USE=$$(lsof -ti :8080); \
	if [ -n "$$PORT_IN_USE" ]; then \
		echo "⚠️  Port 8080 is already in use (PID: $$PORT_IN_USE)"; \
	else \
		echo "🚀 Starting bootRun..."; \
		source .env && nohup ./gradlew bootRun > bootrun.log 2>&1 & \
		sleep 10; \
	fi; \

	echo "📄 Generating OpenAPI docs..."; \
	./gradlew generateOpenApiDocs; \

	echo "🛑 Stopping process on port 8080..."; \
	PID=$$(lsof -ti tcp:8080); \
	if [ -n "$$PID" ]; then kill $$PID && echo "✅ Killed process $$PID"; fi

build-local:
	source .env && ./gradlew build

build-docker:
	aws ecr get-login-password --region ap-northeast-1 --profile soel_cms | docker login --username AWS --password-stdin 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com
	docker build -t dev-soel-cms .
	docker tag dev-soel-cms:latest 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com/dev-soel-cms:latest
	docker push 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com/dev-soel-cms:latest
	say "ビルドが完了しました"