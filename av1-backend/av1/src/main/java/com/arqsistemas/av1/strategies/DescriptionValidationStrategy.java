package com.arqsistemas.av1.strategies;

import com.arqsistemas.av1.entities.Task;
import org.springframework.stereotype.Component;

@Component
public class DescriptionValidationStrategy implements TaskValidationStrategy {
    @Override
    public void validateTask(Task task) {
        if (task.getDescription() != null && task.getDescription().length() > 255) {
            throw new IllegalArgumentException("The task description is cannot be over 255 characters.");
        }
    }
}
