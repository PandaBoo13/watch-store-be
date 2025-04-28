package com.example.watch_store_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Table( name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String accountid;
    private String password;
    private String role;

    // Quan hệ One-to-One ngược lại
    @OneToOne(mappedBy = "account")
    private User user;  // Lớp User là lớp ánh xạ với bảng user
}
