package com.DigitalBooking.jwt.payload;

import com.DigitalBooking.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {

    public Integer id;

    public String name;

    public String lastName;

    public Role role;

    public String email;

    private String jwt;

}
