package com.DigitalBooking.model;

import com.DigitalBooking.model.dto.FavoriteDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name =  "favorites")
@Entity
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",  unique = true)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "products_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public FavoriteDTO toDTO() {
        FavoriteDTO favoriteDTO = new FavoriteDTO();
        favoriteDTO.setId(id);
        favoriteDTO.setUser(user);
        favoriteDTO.setProduct(product);
        return favoriteDTO;
    }

}
