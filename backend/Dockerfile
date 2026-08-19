# Build stage
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy maven wrapper and pom
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Give execution permission to mvnw
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
