package com.DigitalBooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Builder
@Table(name = "categories")

public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",  unique = true)
    private Integer id;

    @NotBlank
    @NotNull
    @Size(max =45, message = "El titulo no puede exeder los 45 caracteres")
    private String title;

    @NotBlank
    @NotNull
    private String description;

    @NotBlank()
    @NotNull
    private String imgUrl;


    @JsonIgnore
    @Column(nullable = false)
    private Boolean deleted = false;

}
