package com.arqsistemas.av1.observers;

import com.arqsistemas.av1.entities.Task;

public interface TaskObserver {
    void onTaskCreated(Task task);
    void onTaskUpdated(Task oldTask, Task newTask);
    void onTaskDeleted(Task task);
}