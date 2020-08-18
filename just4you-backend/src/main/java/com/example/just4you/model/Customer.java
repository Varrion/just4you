package com.example.just4you.model;

import com.example.just4you.model.dto.CustomerDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
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

    public void UpdateCustomer(CustomerDto customerDto, Optional<byte[]> pictureBytes) {
        username = customerDto.getUsername();
        password = customerDto.getPassword();
        name = customerDto.getName();
        surname = customerDto.getSurname();
        email = customerDto.getEmail();
        picture = pictureBytes.orElse(null);
        address = customerDto.getAddress();
        city = customerDto.getCity();
    }
}
