package com.DigitalBooking.model.dto;

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
public class SignUpRequestFull {


        @NotEmpty
        @Length(min = 4,max = 50)
        private String username;

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

