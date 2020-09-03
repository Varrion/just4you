package com.example.just4you.security;

import com.example.just4you.service.CustomerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityContext extends WebSecurityConfigurerAdapter {

    private final CustomerService customerService;

    public WebSecurityContext(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/api/customers/login").permitAll()
                .antMatchers("/api/customers/register").permitAll()
                .antMatchers("/api/categories/**").permitAll()
                .antMatchers("/api/items").permitAll()
                .antMatchers("/api/items/category/{id}").permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(customerService).passwordEncoder(passwordEncoder());
    }

    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
