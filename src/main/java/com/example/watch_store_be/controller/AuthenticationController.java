package com.example.watch_store_be.controller;

import com.example.watch_store_be.dto.request.RegisterRequset;
import com.example.watch_store_be.dto.response.ApiResponse;
import com.example.watch_store_be.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;
    @PostMapping("/register")
    ResponseEntity<ApiResponse> register(@RequestBody RegisterRequset requset){
        ApiResponse apiResponse= ApiResponse.builder()
                .status(true)
                .message("Đăng ký thành công")
                .data(authenticationService.Register(requset))
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
