package com.example.just4you.service.impl;

import com.example.just4you.model.Item;
import com.example.just4you.model.ShoppingCart;
import com.example.just4you.repository.ShoppingCartRepository;
import com.example.just4you.service.ItemService;
import com.example.just4you.service.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    final private ShoppingCartRepository shoppingCartRepository;
    final private ItemService itemService;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, ItemService itemService) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.itemService = itemService;
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
    public ShoppingCart editCart(String username, Long itemId) {

        ShoppingCart cart = getByCustomerUsername(username);
        Optional<Item> optionalItem = itemService.getOneItem(itemId);

        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            Set<Item> cartItems = cart.getItems();

            if (cartItems.contains(item)) {
                cartItems.remove(item);
            } else {
                cartItems.add(item);
            }

            cart.setItems(cartItems);
            return shoppingCartRepository.save(cart);
        }

        return null;
    }

    @Override
    public void deleteCart(Long id) {
        shoppingCartRepository.deleteById(id);
    }
}
