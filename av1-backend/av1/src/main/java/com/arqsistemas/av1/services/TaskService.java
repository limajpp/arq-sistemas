package com.arqsistemas.av1.services;

import com.arqsistemas.av1.entities.Task;
import com.arqsistemas.av1.observers.TaskObserver;
import com.arqsistemas.av1.repository.TaskRepository;
import com.arqsistemas.av1.strategies.TaskValidationStrategy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final List<TaskValidationStrategy> taskValidationStrategies;
    private final List<TaskObserver> observers;

    public TaskService(TaskRepository taskRepository, List<TaskValidationStrategy> taskValidationStrategies, List<TaskObserver> observers) {
        this.taskRepository = taskRepository;
        this.taskValidationStrategies = taskValidationStrategies;
        this.observers = observers;
    }

    public Task create(Task task) {
        for (TaskValidationStrategy taskValidationStrategy : taskValidationStrategies) {
            taskValidationStrategy.validateTask(task);
        }

        Task savedTask = this.taskRepository.save(task);

        for (TaskObserver observer : observers) {
            observer.onTaskCreated(savedTask);
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

        Task oldTaskFromDb = this.taskRepository.findById(task.getId()).orElse(null);
        if (oldTaskFromDb != null) {
            Task oldTaskSnapshot = new Task();
            oldTaskSnapshot.setId(oldTaskFromDb.getId());
            oldTaskSnapshot.setTitle(oldTaskFromDb.getTitle());
            oldTaskSnapshot.setDescription(oldTaskFromDb.getDescription());
            oldTaskSnapshot.setDone(oldTaskFromDb.isDone());

            Task updatedTask = this.taskRepository.save(task);
            for (TaskObserver observer : observers) {
                observer.onTaskUpdated(oldTaskSnapshot, updatedTask);
            }

            return updatedTask;
        }

        return this.taskRepository.save(task);
    }

    public void delete(Long id) {
        Task task = this.taskRepository.findById(id).orElse(null);
        
        if (task != null) {
            this.taskRepository.deleteById(id);
            
            for (TaskObserver observer : observers) {
                observer.onTaskDeleted(task);
            }
        }
    }
}
