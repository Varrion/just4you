package com.example.just4you.model.dto;

import lombok.Data;

@Data
public class Payment {
    public String apiKey;
    Integer customerId;

    String email;

    String token;

    int amount;
}
