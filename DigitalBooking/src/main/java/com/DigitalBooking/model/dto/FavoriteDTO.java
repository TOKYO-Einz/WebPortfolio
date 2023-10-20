package com.DigitalBooking.model.dto;

import com.DigitalBooking.model.Favorite;
import com.DigitalBooking.model.Product;
import com.DigitalBooking.model.User;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDTO {

    private Integer id;

    private Product product;

    private User user;

    public Favorite toEntity() {
        Favorite favorite = new Favorite();
        favorite.setId(id);
        favorite.setUser(user);
        favorite.setProduct(product);
        return favorite;
    }

}
