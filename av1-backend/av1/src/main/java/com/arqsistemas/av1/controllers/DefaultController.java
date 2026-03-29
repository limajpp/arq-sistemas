package com.arqsistemas.av1.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultController {
    @GetMapping("/")
    public String healthCheck() {
        return "Hey stranger! Welcome to my To-Do List API.";
    }
}
