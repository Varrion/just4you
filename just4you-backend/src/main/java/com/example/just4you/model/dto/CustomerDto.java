package com.example.just4you.model.dto;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Lob;

@Data
public class CustomerDto {

    @NotNull
    String username;

    @NotNull
    String password;

    String name;

    String surname;

    String address;

    String city;

    @NotNull
    String email;

    Boolean isSeller;
}
