package com.example.watch_store_be.dto.response;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean status;      // Mã trạng thái HTTP (200, 404, 500, v.v.)
    private String message;      // Thông điệp ngắn gọn
    private T data;

}