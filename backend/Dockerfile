FROM --platform=linux/x86_64 public.ecr.aws/docker/library/gradle:jdk21-alpine AS build

WORKDIR /app

COPY . .

RUN ./gradlew build


FROM --platform=linux/x86_64 public.ecr.aws/docker/library/eclipse-temurin:21-jdk-alpine AS production
#FROM public.ecr.aws/docker/library/openjdk:24-slim

WORKDIR /app

COPY --from=build /app/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar", "--spring.profiles.active=dev"]

