# Use official JDK 21 image
FROM eclipse-temurin:21-jdk

# Set working directory inside the container
WORKDIR /app

# Copy everything
COPY . .

# ✅ Fix permissions so mvnw can run
RUN chmod +x ./mvnw

# Build the Spring Boot app (skip tests to save time)
RUN ./mvnw clean package -DskipTests

# Run the built JAR file
CMD ["sh", "-c", "java -jar target/*.jar"]
