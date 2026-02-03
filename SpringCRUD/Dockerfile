FROM eclipse-temurin:17-jdk-alpine AS BUILD
WORKDIR /springCRUD_build
COPY . /springCRUD_build
RUN chmod +x ./gradlew
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=BUILD /springCRUD_build/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
