# Use official JDK 21 image from Eclipse Temurin
FROM eclipse-temurin:21-jdk

# Set working directory inside the container
WORKDIR /app

# Copy everything from your local project into the container
COPY . .

# Build the Spring Boot app (skip tests to speed up build)
RUN ./mvnw clean package -DskipTests

# Run the compiled JAR file (Render will use this as entrypoint)
CMD ["sh", "-c", "java -jar target/*.jar"]