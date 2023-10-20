package com.DigitalBooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",  unique = true)
    private Integer id;


    @NotNull
    private String name;



    @NotNull
    @DecimalMax("25")
    private Double latitude;


    @NotNull
    @DecimalMax("25")
    private Double longitude;


    @NotNull
    private String address;

    @JsonIgnore
    @Column(nullable = false)
    private Boolean deleted = false;



}
