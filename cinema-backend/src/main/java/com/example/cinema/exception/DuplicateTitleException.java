package com.example.cinema.exception;

public class DuplicateTitleException extends RuntimeException {
    public DuplicateTitleException(String title) {
        super("Film with title '" + title + "' already exists");
    }
}
