package com.DigitalBooking.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {


    public Integer id;

    public String title;

    public String description;

    public String imgUrl;
}
