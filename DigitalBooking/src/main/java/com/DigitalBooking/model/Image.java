package com.DigitalBooking.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "images", indexes = {@Index(name = "idx_product_id", columnList = "products_id")})
public class Image {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",  unique = true)
    private Integer id;


    @Column(nullable = false)
    @NotBlank(message = "Imagen debe tener una url")
    private String url;

}
