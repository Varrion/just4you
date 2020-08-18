package com.example.just4you.service;

import com.example.just4you.model.ShoppingCart;

import java.util.List;
import java.util.Optional;


public interface ShoppingCartService {
    List<ShoppingCart> getAllCarts();

    ShoppingCart getByCustomerUsername(String username);

    Optional<ShoppingCart> getOneCart(Long id);

    ShoppingCart saveCart(ShoppingCart shoppingCart);

    ShoppingCart editCart(ShoppingCart shoppingCart);

    void deleteCart(Long id);
}
