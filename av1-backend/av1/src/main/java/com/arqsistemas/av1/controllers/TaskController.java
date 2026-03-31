package com.arqsistemas.av1.controllers;

import com.arqsistemas.av1.entities.Task;
import com.arqsistemas.av1.services.TaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return this.taskService.create(task);
    }

    @GetMapping("/{id}")
    public Task readTask(@PathVariable Long id) {
        return this.taskService.read(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return this.taskService.update(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        this.taskService.delete(id);
    }
}
