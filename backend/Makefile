start:
	source .env && ./gradlew bootRun

build-docker:
	aws ecr get-login-password --region ap-northeast-1 --profile soel_cms | docker login --username AWS --password-stdin 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com
	docker build -t dev-soel-cms .
	docker tag dev-soel-cms:latest 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com/dev-soel-cms:latest
	docker push 211125631266.dkr.ecr.ap-northeast-1.amazonaws.com/dev-soel-cms:latest
	say "ビルドが完了しました"