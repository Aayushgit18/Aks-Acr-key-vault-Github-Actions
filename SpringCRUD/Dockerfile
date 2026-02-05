# -------- BUILD STAGE --------
FROM eclipse-temurin:17-jdk-alpine AS BUILD
WORKDIR /springCRUD_build

# Copy only files needed to resolve dependencies (CACHE FRIENDLY)
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

# Copy source code last
COPY src src
RUN ./gradlew bootJar --no-daemon

# -------- RUNTIME STAGE --------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy ONLY the runnable jar
COPY --from=BUILD /springCRUD_build/build/libs/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
