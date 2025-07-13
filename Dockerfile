# Use official OpenJDK 21 image
FROM eclipse-temurin:21-jdk

# Set environment variables (optional if passed at runtime)
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JAVA_OPTS=""

# Set working directory inside container
WORKDIR /app

# Copy the JAR file from target directory to container
COPY target/cutsomized_chatbot-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
