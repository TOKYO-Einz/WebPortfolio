package com.DigitalBooking.model.dto;


import com.DigitalBooking.model.*;
import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {


    private Integer id;

    private String name;


    private String description;


    private Integer stock;


    private String price;

    private Double averageScore;


    private Brand brand;


    private Branch branch;


    private Category category;

    private List<Feature> features;

    private List<Image> images;

}