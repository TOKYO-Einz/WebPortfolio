package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Category;
import com.DigitalBooking.model.dto.CategoryDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import org.springframework.data.domain.Pageable;


public interface CategoryService {

    Category addCategory(CategoryDTO categoryDTO);

    CategoryDTO searchCategory(Integer id);

    void editCategory(CategoryDTO categoryDTO);

    void deleteCategory (Integer id) throws ResourceNotFoundException;

   /**Set<CategoryDTO> listCategories();**/

    PageResponseDTO<CategoryDTO> getCategories(Pageable pageable);
}
