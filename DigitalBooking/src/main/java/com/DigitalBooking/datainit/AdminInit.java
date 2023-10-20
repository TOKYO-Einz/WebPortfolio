package com.DigitalBooking.datainit;

import com.DigitalBooking.model.User;
import com.DigitalBooking.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.DigitalBooking.model.Role.ADMIN;

@Service
@AllArgsConstructor
public class AdminInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        userRepository.save(User.builder()
                        .id(1)
                .name("admin")
                        .lastname("admin")
                .password(passwordEncoder.encode("admin"))
                        .email("digitalbooking.02@gmail.com")
                        .age(true)
                        .deleted(false)
                .role(ADMIN)
                .build());
    }
}