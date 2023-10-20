package com.DigitalBooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "products")
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",  unique = true)
    private Integer id;

    private String name;

    @Size(max= 1000, message = "La descripcion no puede exeder los 1000 caracteres")
    private String description;

    private String price;

    private Integer stock;

    private Double averageScore;

    @JsonIgnore
    @Column(nullable = false)
    private Boolean deleted = false;


    //RELATIONS

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "products_id")
    private List<Image> images;

    @ManyToOne()
    @JoinColumn(name = "brands_id")
    private Brand brand;

    @ManyToOne()
    @JoinColumn(name = "categories_id")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "branches_id")
    private Branch branch;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name = "products_features",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    foreignKey = @ForeignKey(name = "product_feature_id")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "feature_id",
                    foreignKey = @ForeignKey(name = "feature_product_id")
            )
    )
    private List<Feature> features;

}
