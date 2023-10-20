package com.DigitalBooking.service.impl;


import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.*;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.model.dto.ProductDTO;
import com.DigitalBooking.repository.ProductRepository;
import com.DigitalBooking.service.interfaces.ImageService;
import com.DigitalBooking.service.interfaces.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {


    private final ProductRepository productRepository;
    private final ObjectMapper mapper;
    private final ConversionService conversionService;
    private final ImageService imageService;
    private static  final Logger log= Logger.getLogger(ProductServiceImpl.class);


    @Override
    public PageResponseDTO<ProductDTO> getProducts(Pageable pageable) {

        var page = productRepository.findByDeleted(false, pageable);
        log.info("list of products has been created");
        return new PageResponseDTO<>(
                page.getContent().stream()
                        .map(product -> conversionService.convert(product, ProductDTO.class)).toList()
                , page.getPageable()
                , page.getTotalElements());
    }


    @Override
    public Product searchProduct(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        Product productFounded = null;
        if(product.isPresent())
            productFounded = product.get();
        log.info("Product "+id + " has been found");

        return productFounded;
    }

    @Override
    public Product addProduct(ProductDTO productDTO) {
        Product product = mapper.convertValue(productDTO,Product.class);

        if(productDTO.getCategory() != null){
            Category category = mapper.convertValue(productDTO.getCategory(), Category.class);
            product.setCategory(category);
        }
        if(productDTO.getBrand() != null){
            Brand brand = mapper.convertValue(productDTO.getBrand(), Brand.class);
            product.setBrand(brand);
        }
        if(productDTO.getBranch() != null){
            Branch branch = mapper.convertValue(productDTO.getBranch(), Branch.class);
            product.setBranch(branch);
        }
        if(productDTO.getFeatures() != null){
            List<Feature> features = new ArrayList<>();
            for (Object featureObject: productDTO.getFeatures()) {
                Feature feature = mapper.convertValue(featureObject, Feature.class);
                features.add(feature);
            }
            product.setFeatures(features);
        }
        if (productDTO.getImages() != null) {
            List<Image> images = new ArrayList<>();
            for (Image image : productDTO.getImages()) {
                Image imagex = imageService.addImage(image);
                images.add(imagex);
            }
            product.setImages(images);
        }

        log.info("Feature "+product.getName()+" has been created");
        return productRepository.save(product);
    }

    @Override
    public void editProduct(ProductDTO productDTO) {
        Product product = mapper.convertValue(productDTO,Product.class);
        productRepository.save(product);
        log.info("Product "+productDTO.getId()+" has been updated");

    }

    @Override
    public void deleteProduct(Integer id) throws ResourceNotFoundException {
        productRepository.softDelete(id);
        log.info("Product "+id+" has been deleted");
        if (searchProduct(id) == null )
            throw new ResourceNotFoundException("Product not found " + id);
    }

    @Override
    public List<ProductDTO> searchByProductNameOrBrand(String value) {
        List<Product> products = productRepository.findByProductNameOrBrand(value);
        List<ProductDTO> productsDTO = new ArrayList<>();
        for (Product product : products) {
            productsDTO.add(mapper.convertValue(product, ProductDTO.class));
        }
        log.info("Products list has been found");
        return productsDTO;
    }

}

