package com.example.just4you.controller;

import com.example.just4you.model.Customer;
import com.example.just4you.model.dto.CategoryDto;
import com.example.just4you.model.dto.CustomerDto;
import com.example.just4you.service.CustomerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService shopperService) {
        this.customerService = shopperService;
    }

    @GetMapping
    List<Customer> getAllCustomers() {
        return customerService.getAllCustomer();
    }

    @GetMapping("/{username}")
    Optional<Customer> getCustomer(@PathVariable String username) {
        return customerService.getOneCustomer(username);
    }

    @PostMapping
    Customer addCustomer(@RequestParam("customerDto") CustomerDto customerDto,
                         @RequestParam("customerPicture") MultipartFile customerPicture) throws IOException {
        return customerService.saveCustomer(customerDto, customerPicture);
    }

    @PutMapping("/{username}")
    Customer editedCustomer(@PathVariable String username, @RequestParam("customerDto") CustomerDto customerDto,
                            @RequestParam("customerPicture") MultipartFile customerPicture) throws IOException {
        return customerService.editCustomer(customerDto, customerPicture, username);
    }

    @DeleteMapping("/{username}")
    void deleteCustomer(@PathVariable String username) {
        customerService.deleteCustomer(username);
    }
}
