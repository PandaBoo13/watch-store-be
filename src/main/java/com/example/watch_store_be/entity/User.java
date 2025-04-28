package com.example.watch_store_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    private String userid; // Khóa chính, kiểu VARCHAR(50)
    private String email;
    private String fullname;
    private String phonenumber;
    private String address;

    // Mối quan hệ với bảng account, giả sử khóa ngoại trỏ đến accountid
    @OneToOne
    @JoinColumn(name = "userid", referencedColumnName = "accountid", foreignKey = @ForeignKey(name = "FK_user_account"))
    private Account account;  // Lớp Account là lớp ánh xạ với bảng account
}
