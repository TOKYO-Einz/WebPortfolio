package com.DigitalBooking.model.dto;

import java.util.List;

public class ProductPageDTO extends PageResponseDTO<ProductDTO> {
    public ProductPageDTO(List<ProductDTO> content) {
        super(content);
    }
}
