package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Brand;
import com.DigitalBooking.model.Category;
import com.DigitalBooking.model.dto.BrandDTO;
import com.DigitalBooking.model.dto.CategoryDTO;

import java.util.Set;

public interface BrandService {
    Brand addBrand(BrandDTO brandDTO);

    BrandDTO searchBrand(Integer id);


    void editBrand(BrandDTO brandDTO);

    void deleteBrand (Integer id) throws ResourceNotFoundException;

    Set<BrandDTO> listBrands();
}
