package com.sync.study.controller;

import com.sync.study.domain.Person;
import com.sync.study.repository.PersonRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudyController {
    private static PersonRepository personRepository;

    public StudyController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }


    @GetMapping("/api/data1")
    public String data() {
        return "Hello, React";
    }

    @GetMapping("/api/data")
    public String getPerson() {
        Person person = personRepository.findAll().get(0);
        return person.getName();
    }
}
