package com.example.watch_store_be.dto.request;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class RegisterRequset {
    private String email;
    private String fullname;
    private String phonenumber;
    private String address;
    private String password;

}
