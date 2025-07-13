# === Stage 1: Build the application ===
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy only what's needed to install dependencies first
COPY pom.xml .
COPY src ./src

# Build the Spring Boot app (skip tests to save time)
RUN mvn clean package -DskipTests

# === Stage 2: Run the application ===
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
