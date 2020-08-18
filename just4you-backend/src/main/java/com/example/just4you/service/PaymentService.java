package com.example.just4you.service;

import com.example.just4you.model.dto.Payment;

public interface PaymentService {

        String createSubscription(String customerId, String plan, String coupon);

        boolean cancelSubscription(String subscriptionId);

        String createCharge(Payment paymentRequest);
}
