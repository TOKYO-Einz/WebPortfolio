package com.DigitalBooking.controller;

import com.DigitalBooking.jwt.payload.AuthenticationResponse;
import com.DigitalBooking.jwt.payload.LoginRequest;
import com.DigitalBooking.jwt.payload.SignUpRequest;

import com.DigitalBooking.service.interfaces.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NonNull;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
@AllArgsConstructor
@Tag(name = "Authentication")
public class 33333AuthenticationController {

    private final AuthenticationService authenticationService;


    @Operation(summary = "Login with user and password and returns JWT token", responses = {
            @ApiResponse(responseCode = "200",description = "Successful Operation", content = @Content),
            @ApiResponse(responseCode = "401", description = "Authentication Failure", content = @Content)})
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody @Valid @NonNull LoginRequest loginRequest) {

        return authenticationService.login(loginRequest);    }





    @Operation(summary = "Sign up and returns JWT token", responses = {
            @ApiResponse(responseCode = "200",description = "Successful Operation", content = @Content),
            @ApiResponse(responseCode = "409", description = "User already exists", content = @Content)})
    @PostMapping("/sign-up")
    public AuthenticationResponse signUp(@RequestBody @Valid @NonNull SignUpRequest signUpRequest) {
        return authenticationService.signUp(signUpRequest);
    }

}
