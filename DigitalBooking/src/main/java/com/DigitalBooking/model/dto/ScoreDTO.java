package com.DigitalBooking.model.dto;

import com.DigitalBooking.model.Product;
import com.DigitalBooking.model.Score;
import com.DigitalBooking.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ScoreDTO {
    private Integer id;

    private Double value;

    private Product product;


    public Score toEntity() {
        Score scoreEntity = new Score();
        scoreEntity.setId(id);
        scoreEntity.setValue(value);
        scoreEntity.setProduct(product);

        return scoreEntity;
    }
}
