package com.arqsistemas.av1.services;

import com.arqsistemas.av1.entities.Task;
import com.arqsistemas.av1.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task create(Task task) {
        return this.taskRepository.save(task);
    }

    public Task read(Long id) {
        return this.taskRepository.findById(id).orElse(null);
    }

    public Task update(Task task) {
        return this.taskRepository.save(task);
    }

    public void delete(Long id) {
        this.taskRepository.deleteById(id);
    }
}
