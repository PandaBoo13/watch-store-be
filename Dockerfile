# Stage 1: Build jar
FROM maven:3.9.4-eclipse-temurin-21 as build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests -T 4


# Stage 2: Run jar
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/watch-store-be-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
