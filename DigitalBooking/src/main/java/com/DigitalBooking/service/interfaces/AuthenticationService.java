package com.DigitalBooking.service.interfaces;


import com.DigitalBooking.jwt.payload.AuthenticationResponse;
import com.DigitalBooking.jwt.payload.LoginRequest;
import com.DigitalBooking.jwt.payload.SignUpRequest;

public interface AuthenticationService {
    AuthenticationResponse login(LoginRequest loginRequest);
    AuthenticationResponse signUp(SignUpRequest signUpRequest);

}
