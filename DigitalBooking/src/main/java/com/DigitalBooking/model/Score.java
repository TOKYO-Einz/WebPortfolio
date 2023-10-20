package com.DigitalBooking.model;


import com.DigitalBooking.model.dto.ScoreDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "scores")
public class Score {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",  unique = true)
    private Integer id;

    @NotNull(message = "La puntuación no puede estar vacía")
    @Min(value = 2, message = "La puntuación mínima no puede ser menor a uno")
    @Max(value = 10, message = "La puntuación máxima no puede ser mayor a cinco")
    @Column(name = "scores")
    private Double value;

    @ManyToOne()
    @JoinColumn(name = "products_id")
    private Product product;



    public ScoreDTO toDto() {
        ScoreDTO scoreDTO = new ScoreDTO();
        scoreDTO.setId(id);
        scoreDTO.setValue(value);
        scoreDTO.setProduct(product);
        return scoreDTO;
    }

}
