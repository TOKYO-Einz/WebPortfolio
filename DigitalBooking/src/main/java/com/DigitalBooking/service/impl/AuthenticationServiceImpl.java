package com.DigitalBooking.service.impl;


import com.DigitalBooking.jwt.JwtService;
import com.DigitalBooking.jwt.payload.AuthenticationResponse;
import com.DigitalBooking.jwt.payload.LoginRequest;
import com.DigitalBooking.jwt.payload.SignUpRequest;
import com.DigitalBooking.model.User;
import com.DigitalBooking.repository.UserRepository;
import com.DigitalBooking.service.interfaces.AuthenticationService;
import com.DigitalBooking.service.interfaces.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public AuthenticationResponse login(LoginRequest loginRequest) {


        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                        loginRequest.getPassword()));

        User userR= (User)authentication.getPrincipal();

        String jwt =jwtService
                .generateToken((UserDetails) authentication.getPrincipal());


        return   AuthenticationResponse.builder()
                .id(userR.getId())
                .name(userR.getName())
                .lastName(userR.getLastname())
                .email(userR.getEmail())
                .role(userR.getRole())
                .jwt(jwt)
                .build() ;
    }

    @Override
    public AuthenticationResponse signUp(SignUpRequest signUpRequest) {
        UserDetails userDetails = userService.createUser(signUpRequest);
        return AuthenticationResponse.builder()
                .jwt(jwtService.generateToken(userDetails))
                .build();
    }
}
