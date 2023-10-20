package com.DigitalBooking.model.dto;


import jakarta.validation.constraints.DecimalMax;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchDTO {

    private Integer id;

    private String name;

    @DecimalMax("25")
    private Double latitude;

    @DecimalMax("25")
    private Double longitude;

    private String address;

}
