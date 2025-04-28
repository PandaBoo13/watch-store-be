package com.example.watch_store_be.exception;

import com.example.watch_store_be.dto.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.function.EntityResponse;

@RestControllerAdvice
public class GlobalHandlerException {
    @ExceptionHandler(AppException.class)
    ResponseEntity<ErrorResponse> handlingRuntimeException(AppException exception){
        ErrorResponse response= ErrorResponse.builder()
                .code(400)
                .message(exception.getMessage())
                .build();
        return ResponseEntity.badRequest().body(response);
    }
}
