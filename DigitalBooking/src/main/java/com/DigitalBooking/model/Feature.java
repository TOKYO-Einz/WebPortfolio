package com.DigitalBooking.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;



@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Builder
@Table(name = "feature")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Integer id;

    @NotNull
    @NotBlank(message = "La caracteristica debe tener un nombre")
    @Size(max = 255, message = "Nombre de la característica no debe tener más de 255 caracteres")
    private String name;

    @NotNull
    @NotBlank(message = "La caracteristica debe tener un icono")
    private String icon;

}