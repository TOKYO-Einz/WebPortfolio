package com.DigitalBooking.model.dto;

import com.DigitalBooking.model.Location;
import com.DigitalBooking.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullUserDTO {

    private Integer id;

    private String name;


    private String lastname;


    private String email;


    private String password;

    private String document;

    private Date date;

    private Role role;

    private Location location;
}
