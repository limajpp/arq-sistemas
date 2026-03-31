package com.arqsistemas.av1.observers;

import com.arqsistemas.av1.entities.Task;
import org.springframework.stereotype.Component;

@Component
public class LogTaskObserver implements TaskObserver {
    @Override
    public void onTaskCreated(Task task) {
        System.out.println("=================================================");
        System.out.println("[LOG] New task created!");
        System.out.println("ID: " + task.getId());
        System.out.println("Title: " + task.getTitle());
        System.out.println("=================================================");
    }

    @Override
    public void onTaskUpdated(Task oldTask, Task newTask) {
        System.out.println("=================================================");
        System.out.println("[LOG] A task has been updated!");
        System.out.println("ID: " + newTask.getId());
        System.out.println();
        System.out.println("Previous data:");
        System.out.println("  Title: " + oldTask.getTitle());
        System.out.println("  Description: " + oldTask.getDescription());
        System.out.println("  Done: " + oldTask.isDone());
        System.out.println();
        System.out.println("New data:");
        System.out.println("  Title: " + newTask.getTitle());
        System.out.println("  Description: " + newTask.getDescription());
        System.out.println("  Done: " + newTask.isDone());
        System.out.println("=================================================");
    }

    @Override
    public void onTaskDeleted(Task task) {
        System.out.println("=================================================");
        System.out.println("[LOG] A task has been deleted!");
        System.out.println("ID: " + task.getId());
        System.out.println("Title: " + task.getTitle());
        System.out.println("=================================================");
    }
}