package com.DigitalBooking.service.interfaces;


import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Product;
import com.DigitalBooking.model.dto.FullUserDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.model.dto.ProductDTO;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Set;

public interface ProductService {


    /*Set<ProductDTO> listProducts();*/

    Product searchProduct(Integer id);

    Product addProduct(ProductDTO productDTO);

    void editProduct(ProductDTO productDTO);

    void deleteProduct(Integer id) throws ResourceNotFoundException;

    List<ProductDTO> searchByProductNameOrBrand(String value);

    PageResponseDTO<ProductDTO> getProducts(Pageable pageable);

}
