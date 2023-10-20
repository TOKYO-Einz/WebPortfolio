package com.DigitalBooking.jwt.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.stereotype.Component;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class SignUpRequest {


    @NotEmpty
    @Length(min = 4,max = 50)
    private String name;

    private String lastname;

    @NotEmpty
    @Length(min = 4,max = 50)
    private String password;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private boolean age;




}
