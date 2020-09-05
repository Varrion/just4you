package com.example.just4you.model;

import com.example.just4you.model.dto.CustomerDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer implements UserDetails {
    @Id
    String username;

    String password;

    String name;

    String surname;

    String email;

    String address;

    String city;

    Boolean isSeller;

    @Lob
    byte[] picture;

    @OneToOne(mappedBy = "customer", orphanRemoval = true)
    @JsonIgnore
    ShoppingCart shoppingCart;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void UpdateCustomer(CustomerDto customerDto, MultipartFile pictureBytes) throws IOException {
        username = customerDto.getUsername();
        password = customerDto.getPassword();
        name = customerDto.getName();
        surname = customerDto.getSurname();
        email = customerDto.getEmail();
        address = customerDto.getAddress();
        city = customerDto.getCity();

        if (pictureBytes != null) {
            picture = pictureBytes.getBytes();
        }
    }
}
