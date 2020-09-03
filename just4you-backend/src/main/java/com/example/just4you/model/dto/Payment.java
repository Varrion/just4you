package com.example.just4you.model.dto;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class Payment {

    @NotNull
    String email;

    @NotNull
    String token;

    @NotNull
    int amount;
}
