package com.arqsistemas.av1.strategies;

import com.arqsistemas.av1.entities.Task;
import org.springframework.stereotype.Component;

@Component
public class TitleValidationStrategy implements TaskValidationStrategy {
    @Override
    public void validateTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("The task title must not be empty.");
        }
    }
}
