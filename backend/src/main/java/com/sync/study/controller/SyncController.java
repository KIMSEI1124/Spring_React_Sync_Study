package com.sync.study.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SyncController {

    @GetMapping("/api/data")
    public String data() {
        return "Hello, React";
    }
}
