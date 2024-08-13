
FROM public.ecr.aws/docker/library/openjdk:24-slim

WORKDIR /app

COPY build/libs/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

