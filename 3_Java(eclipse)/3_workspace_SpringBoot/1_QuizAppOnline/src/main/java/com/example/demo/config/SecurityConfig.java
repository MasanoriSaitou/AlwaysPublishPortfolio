package com.example.demo.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
            	
            	// ★ Unity から叩く API は認証不要にする
                .requestMatchers("/api/**").permitAll()
            	// ★ Webアプリ用のログインページはそのまま
                .requestMatchers("/login", "/login?error","/admin-login").permitAll()
                // ★ それ以外は認証必須（Webアプリの保護）
                .anyRequest().authenticated()
            ).formLogin(login -> login
                .loginPage("/login")
                .loginProcessingUrl("/login")   // ★ これが無いとループする
                .defaultSuccessUrl("/dashboard", true)
                .permitAll()
            )
            .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("pass")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}