package com.example.just4you.service.impl;

import com.example.just4you.model.ShoppingCart;
import com.example.just4you.repository.ShoppingCartRepository;
import com.example.just4you.service.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    final private ShoppingCartRepository shoppingCartRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Override
    public List<ShoppingCart> getAllCarts() {
        return shoppingCartRepository.findAll();
    }

    @Override
    public ShoppingCart getByCustomerUsername(String username) {
        return shoppingCartRepository.findByCustomerUsername(username);
    }

    @Override
    public Optional<ShoppingCart> getOneCart(Long id) {
        return shoppingCartRepository.findById(id);
    }

    @Override
    public ShoppingCart saveCart(ShoppingCart shoppingCart) {
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart editCart(ShoppingCart shoppingCart) {

        Optional<ShoppingCart> cart = getOneCart(shoppingCart.getId());

        if (cart.isPresent()) {
            ShoppingCart editedCart = cart.get();
            editedCart.setId(shoppingCart.getId());
            editedCart.setItems(shoppingCart.getItems());
            editedCart.setCustomer(shoppingCart.getCustomer());

            return shoppingCartRepository.save(editedCart);
        }
        return null;
    }

    @Override
    public void deleteCart(Long id) {
        shoppingCartRepository.deleteById(id);
    }
}
