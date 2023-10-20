package com.DigitalBooking.converters;

import com.DigitalBooking.model.Category;

import com.DigitalBooking.model.dto.CategoryDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CategoryToCategoryDTOConverter implements Converter<Category, CategoryDTO> {

    @Override
    public CategoryDTO convert(Category source) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(source.getId());
        categoryDTO.setTitle(source.getTitle());
        categoryDTO.setDescription(source.getDescription());
        categoryDTO.setImgUrl(source.getImgUrl());
        return categoryDTO;
    }
}
