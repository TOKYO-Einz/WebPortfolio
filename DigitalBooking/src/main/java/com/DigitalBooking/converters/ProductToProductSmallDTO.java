package com.DigitalBooking.converters;

import com.DigitalBooking.model.Product;

import com.DigitalBooking.model.dto.ProductSmallDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProductToProductSmallDTO implements Converter<Product, ProductSmallDTO> {

    @Override
    public ProductSmallDTO convert(Product source) {
        ProductSmallDTO smallDTO = new ProductSmallDTO();
        smallDTO.setId(source.getId());
        return  smallDTO;

    }
}
