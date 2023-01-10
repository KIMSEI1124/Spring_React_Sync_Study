# 개요도

---

Backend : Spring Boot<br>
FrontEnd : React<br>
DB : MySQL<br>

Docker, Jenkins, AWS


# React 연동하기

---

React 에서 `/api`쪽은 백엔드 데이터를 받도록 설정을하였다.<br>
컨트롤러를 아래와 같이 만들면 된다.

```java
package com.demogroup.demoweb.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }
}
```

# 빌드하기

---

`build.gradle` 파일 하단에 다음과 같은 코드를 추가한다.<br>
SpringBoot 프로젝트가 Build 될 때 React 프로젝트가 먼저 Build 되고<br>
결과물을 Spring Boot 프로젝트 Build 결과물에 포함시킨다는 스크립트이다.
```text
def frontendDir = "$projectDir/src/main/frontend"

sourceSets {
	main {
		resources { srcDirs = ["$projectDir/src/main/resources"]
		}
	}
}

processResources { dependsOn "copyReactBuildFiles" }

task installReact(type: Exec) {
	workingDir "$frontendDir"
	inputs.dir "$frontendDir"
	group = BasePlugin.BUILD_GROUP
	if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
		commandLine "npm.cmd", "audit", "fix"
		commandLine 'npm.cmd', 'install' }
	else {
		commandLine "npm", "audit", "fix" commandLine 'npm', 'install'
	}
}

task buildReact(type: Exec) {
	dependsOn "installReact"
	workingDir "$frontendDir"
	inputs.dir "$frontendDir"
	group = BasePlugin.BUILD_GROUP
	if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
		commandLine "npm.cmd", "run-script", "build"
	} else {
		commandLine "npm", "run-script", "build"
	}
}

task copyReactBuildFiles(type: Copy) {
	dependsOn "buildReact"
	from "$frontendDir/build"
	into "$projectDir/src/main/resources/static"
}
```

## 문제점

---

Spring Security 가 작동을 하지 않는다.

# Docker 이미지 만들기

---

```dockerfile
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
```

# 참고

---

[u-nij "Spring Boot + React.js 개발환경"](https://velog.io/@u-nij/Spring-Boot-React.
js-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85)