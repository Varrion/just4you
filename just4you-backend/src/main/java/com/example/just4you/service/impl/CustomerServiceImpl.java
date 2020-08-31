package com.example.just4you.service.impl;

import com.example.just4you.model.Customer;
import com.example.just4you.model.ShoppingCart;
import com.example.just4you.model.dto.CustomerDto;
import com.example.just4you.model.dto.CustomerLoginDto;
import com.example.just4you.repository.CustomerRepository;
import com.example.just4you.service.CustomerService;
import com.example.just4you.service.ShoppingCartService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    public final CustomerRepository customerRepository;
    public final ShoppingCartService shoppingCartService;

    public CustomerServiceImpl(CustomerRepository shopperRepository, ShoppingCartService shoppingCartService) {
        this.customerRepository = shopperRepository;
        this.shoppingCartService = shoppingCartService;
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getOneCustomer(String username) {
        return customerRepository.findById(username);
    }

    @Override
    public Customer loginCustomer(CustomerLoginDto customerLoginDto) {
        return customerRepository.getCustomerByUsernameAndPassword(customerLoginDto.getUsername(), customerLoginDto.getPassword());
    }

    @Override
    public Customer saveCustomer(CustomerDto customerDto, MultipartFile customerPicture) throws IOException {
        Customer customer = new Customer();

        customer.setName(customerDto.getName());
        customer.setSurname(customerDto.getSurname());

        customer.setEmail(customerDto.getEmail());
        customer.setUsername(customerDto.getUsername());
        customer.setPassword(customerDto.getPassword());

        customer.setAddress(customerDto.getAddress());
        customer.setCity(customerDto.getCity());

        customer.setIsSeller(customerDto.getIsSeller());
        if (customerPicture != null) {
            customer.setPicture(customerPicture.getBytes());
        }


        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCustomer(customer);
        shoppingCartService.saveCart(shoppingCart);

        return customerRepository.save(customer);
    }

    @Override
    public Customer editCustomer(CustomerDto customerDto, MultipartFile customerPicture, String username) throws IOException {

        Optional<Customer> optionalCustomer = getOneCustomer(username);

        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();

            customer.UpdateCustomer(customerDto, customerPicture);
            return customerRepository.save(customer);
        }
        return null;
    }

    @Override
    public void deleteCustomer(String username) {
        customerRepository.deleteById(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Customer> optionalCustomer = getOneCustomer(username);
        optionalCustomer.orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + "is not found"));

        return optionalCustomer.get();
    }
}