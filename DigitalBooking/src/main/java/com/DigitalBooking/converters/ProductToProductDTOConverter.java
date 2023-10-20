package com.DigitalBooking.converters;

import com.DigitalBooking.model.Product;
import com.DigitalBooking.model.dto.ProductDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProductToProductDTOConverter implements Converter<Product, ProductDTO> {

    @Override
    public ProductDTO convert(Product source) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(source.getId());
        productDTO.setName(source.getName());
        productDTO.setDescription(source.getDescription());
        productDTO.setStock(source.getStock());
        productDTO.setPrice(source.getPrice());
        productDTO.setAverageScore(source.getAverageScore());
        productDTO.setBranch(source.getBranch());
        productDTO.setBrand(source.getBrand());
        productDTO.setCategory(source.getCategory());
        productDTO.setFeatures(source.getFeatures());
        productDTO.setImages(source.getImages());


        return productDTO;

    }

}
