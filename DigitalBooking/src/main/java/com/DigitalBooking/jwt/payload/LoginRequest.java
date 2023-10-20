package com.DigitalBooking.jwt.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {

    @NotEmpty
    @Email
    @Length(min = 4,max = 50)
    private String email;

    @NotEmpty(message = "Invalid Name: Empty name")
    @Length(min = 4,max = 50)
    private String password;

}
