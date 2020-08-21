package com.example.just4you.service;

import com.example.just4you.model.Customer;
import com.example.just4you.model.dto.CustomerDto;
import com.example.just4you.model.dto.CustomerLoginDto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CustomerService extends UserDetailsService {

    List<Customer> getAllCustomer();

    Optional<Customer> getOneCustomer(String username);

    Customer loginCustomer(CustomerLoginDto customerLoginDto);

    Customer saveCustomer(CustomerDto customerDto, MultipartFile customerPicture) throws IOException;

    Customer editCustomer(CustomerDto customerDto, MultipartFile customerPicture, String username) throws IOException;

    void deleteCustomer(String username);
}

