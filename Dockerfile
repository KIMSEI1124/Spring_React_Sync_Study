#JDK 11버젼을 사용한다.
FROM openjdk:11

# *.jar 파일을 생성한다. ( 컴파일 과정 )
CMD ["./gradlew", "clean", "build"]

# *.jar 파일을 변수로 선언한다.
ARG JAR_FILE=./build/libs/*SNAPSHOT.jar

# *.jar 파일을 컨테이너로 복사한다.
COPY $JAR_FILE app.jar

# *.jar 파일을 실행한다.
ENTRYPOINT ["java","-jar","/app.jar"]