# Stage 1: Build jar
FROM maven:3.9.4-eclipse-temurin-21 as build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests -4T

# Stage 2: Run jar
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/CTDT_APP-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
