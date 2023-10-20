package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Category;
import com.DigitalBooking.model.dto.CategoryDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.repository.CategoryRepository;
import com.DigitalBooking.service.interfaces.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.apache.log4j.Logger;
import org.springframework.core.convert.ConversionService;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;



@Service
@AllArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ConversionService conversionService;
    private final ObjectMapper mapper;
    private static  final Logger log= Logger.getLogger(CategoryServiceImpl.class);



    @Override
    public Category addCategory(CategoryDTO categoryDTO) {
        Category category = null;
        if (categoryDTO.getId() != null) {
            category = categoryRepository.findById(categoryDTO.getId()).orElse(null);
        }
        if (category == null) {
            category = mapper.convertValue(categoryDTO, Category.class);

            log.info("Category "+categoryDTO.getTitle() +" has been created");
            category = categoryRepository.save(category);
        }
        return category;
    }




    @Override
    public CategoryDTO searchCategory(Integer id) {
        Optional<Category> category = categoryRepository.findById(id);
        CategoryDTO categoryDTO = null;
        if(category.isPresent())
            categoryDTO = mapper.convertValue(category,CategoryDTO.class);
        log.info("Category "+id+" is found");

        return categoryDTO;
    }
    @Override
    public void editCategory(CategoryDTO categoryDTO) {
        Category category = mapper.convertValue(categoryDTO,Category.class);
        log.info("Category "+categoryDTO.id+" has been updated");
        categoryRepository.save(category);
    }


   /* @Override
    public void deleteCategory(Integer id) throws ResourceNotFoundException {
        if (searchCategory(id) == null)
            throw new ResourceNotFoundException("Category not found " + id);
        else {
            categoryRepository.deleteById(id);
            log.info("Category " + id + " has been deleted");
        }

    }*/

    @Override
    public void deleteCategory(Integer id) throws ResourceNotFoundException{
        categoryRepository.softDelete(id);
        log.info("Category "+id+" has been deleted");
        if (searchCategory(id) == null )
            throw new ResourceNotFoundException("Category not found " + id);
        log.error("Category "+id+" not found");
    }



    @Override
    public PageResponseDTO<CategoryDTO> getCategories(Pageable pageable) {

       var page = categoryRepository.findByDeleted(false,pageable);
        log.info("List of categories has been created ");
        return new PageResponseDTO<>(
                page.getContent().stream()
                        .map(category -> conversionService.convert(category, CategoryDTO.class)).toList()
                , page.getPageable()
                , page.getTotalElements());
    }
}
