package com.example.just4you.repository;

import com.example.just4you.model.Customer;
import com.example.just4you.model.dto.CustomerLoginDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    @Transactional
    Customer getCustomerByUsernameAndPassword(String username, String password);
}
