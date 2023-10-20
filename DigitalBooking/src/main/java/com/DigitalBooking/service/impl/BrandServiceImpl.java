package com.DigitalBooking.service.impl;
import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Brand;
import com.DigitalBooking.model.dto.BrandDTO;
import com.DigitalBooking.repository.BrandRepository;
import com.DigitalBooking.service.interfaces.BrandService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
@Transactional
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ObjectMapper mapper;
    private static  final Logger log= Logger.getLogger(BrandServiceImpl.class);

    @Override
    public Brand addBrand(BrandDTO brandDTO) {
        Brand brand = null;

        if(brandDTO.getId() != null) {
            brand = brandRepository.findById(brandDTO.getId()).orElse(null);
        }
        if(brand == null) {
            brand = mapper.convertValue(brandDTO,Brand.class);
            log.info("Brand "+brandDTO.getName()+" has been created");
            brand = brandRepository.save(brand);
        }
        return brand;
    }

    @Override
    public BrandDTO searchBrand(Integer id) {
        Optional<Brand> brand = brandRepository.findById(id);
        BrandDTO brandDTO = null;
        if(brand.isPresent())
            brandDTO = mapper.convertValue(brand,BrandDTO.class);
        log.info("Brand "+id +" has been found");


        return brandDTO;
    }

    @Override
    public void editBrand(BrandDTO brandDTO) {
        Brand brand = mapper.convertValue(brandDTO,Brand.class);
        log.info("Brand "+brandDTO.getId() +" has been updated");
        brandRepository.save(brand);
    }

    @Override
    public void deleteBrand(Integer id) throws ResourceNotFoundException {
        brandRepository.softDelete(id);
        log.info("Brand " + id + " has been deleted");
        if (searchBrand(id) == null)
            throw new ResourceNotFoundException("No existe brand con id "+id);
        log.error("Brand "+id +" not found");


    }

     /*@Override
     public Set<BrandDTO> listBrands() {
     List<Brand> brands = brandRepository.findAll();
     Set<BrandDTO>brandsDTO = new HashSet<>();

     for (Brand brand:brands) {
     brandsDTO.add(mapper.convertValue(brand, BrandDTO.class));
     }
         log.info("Brand list has been created");
     return  brandsDTO;
     }*/

    @Override
    public Set<BrandDTO> listBrands() {
        List<Brand> brands = brandRepository.findByDelete();
        Set<BrandDTO>brandsDTO = new HashSet<>();

        for (Brand brand:brands) {
            brandsDTO.add(mapper.convertValue(brand, BrandDTO.class));
        }
        log.info("Brand list has been created");
        return  brandsDTO;
    }
}
