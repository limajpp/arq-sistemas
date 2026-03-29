package com.arqsistemas.av1.services;

import com.arqsistemas.av1.entities.Task;
import com.arqsistemas.av1.repository.TaskRepository;
import com.arqsistemas.av1.strategies.TaskValidationStrategy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    private final List<TaskValidationStrategy> taskValidationStrategies;

    public TaskService(TaskRepository taskRepository, List<TaskValidationStrategy> taskValidationStrategies) {
        this.taskRepository = taskRepository;
        this.taskValidationStrategies = taskValidationStrategies;
    }

    public Task create(Task task) {
        for (TaskValidationStrategy taskValidationStrategy : taskValidationStrategies) {
            taskValidationStrategy.validateTask(task);
        }
        return this.taskRepository.save(task);
    }

    public Task read(Long id) {
        return this.taskRepository.findById(id).orElse(null);
    }

    public Task update(Task task) {
        for (TaskValidationStrategy strategy : taskValidationStrategies) {
            strategy.validateTask(task);
        }
        return this.taskRepository.save(task);
    }

    public void delete(Long id) {
        this.taskRepository.deleteById(id);
    }
}
