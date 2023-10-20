package com.DigitalBooking.model.dto;

import java.util.List;

public class CategoryPageDTO extends PageResponseDTO<CategoryDTO>{

    public CategoryPageDTO(List<CategoryDTO> content) {
        super(content);
    }
}
