package com.example.just4you.controller;

import com.example.just4you.model.ShoppingCart;
import com.example.just4you.service.ShoppingCartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shopping-carts")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }
    @GetMapping
    List<ShoppingCart> getAllCarts(){
        return shoppingCartService.getAllCarts();
    }

    @GetMapping("/{id}")
    Optional<ShoppingCart> getItem(@PathVariable Long id){
        return shoppingCartService.getOneCart(id);
    }

    @PostMapping
    ShoppingCart addCart(@RequestBody ShoppingCart shoppingCart){
        return shoppingCartService.saveCart(shoppingCart);
    }

    @PutMapping("/{id}")
    ShoppingCart editedCart(@RequestBody ShoppingCart shoppingCart, @PathVariable Long id){
        return shoppingCartService.editCart(shoppingCart);
    }

    @DeleteMapping("/{id}")
    void deleteCart(@PathVariable Long id){
        shoppingCartService.deleteCart(id);
    }
}
