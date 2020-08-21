package com.example.just4you.model.dto;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class CustomerLoginDto {
    @NotNull
    String username;

    @NotNull
    String password;
}
