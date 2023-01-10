package docker.ci.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/api/world")
    public String world() {
        return "World";
    }
}
