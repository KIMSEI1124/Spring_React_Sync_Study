FROM openjdk:11

CMD ["../gradlew", "clean", "build"]

ARG JAR_FILE=../build/libs/*SNAPSHOT.jar

COPY ${JAR_FILE_PATH} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]