package com.DigitalBooking.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationDTO {

    private Integer id;

    private String city;

    private String postalCode;

    private String phoneNumber;

    private String address;

    private String province;
}
