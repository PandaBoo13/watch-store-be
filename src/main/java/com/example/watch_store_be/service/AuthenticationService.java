package com.example.watch_store_be.service;

import com.example.watch_store_be.dto.request.RegisterRequset;
import com.example.watch_store_be.dto.response.ApiResponse;
import com.example.watch_store_be.entity.Account;
import com.example.watch_store_be.entity.User;
import com.example.watch_store_be.repository.AccountRepository;
import com.example.watch_store_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserRepository userRepository;

    public Account Register(RegisterRequset registerRequset){
        Account account= new Account();
        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        String password= passwordEncoder.encode(registerRequset.getPassword());
        account.setPassword(password);
        account.setRole("USER");
        accountRepository.save(account);

        User user = new User();
        user.setEmail(registerRequset.getEmail());
        user.setFullname(registerRequset.getFullname());
        user.setPhonenumber(registerRequset.getPhonenumber());
        user.setAddress(registerRequset.getAddress());
        user.setUserid(account.getAccountid());
        userRepository.save(user);

       return account;

    }
}
