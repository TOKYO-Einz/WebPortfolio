package com.DigitalBooking.controller;
import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.Product;
import com.DigitalBooking.model.dto.*;
import com.DigitalBooking.repository.ProductRepository;
import com.DigitalBooking.service.interfaces.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/products")
@CrossOrigin (origins = "*", allowedHeaders = "*")
@AllArgsConstructor

public class ProductController{

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final ObjectMapper mapper;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar nuevo producto")
    @PostMapping("/create")
    public ResponseEntity<Object> addProduct(@RequestBody ProductDTO productDTO) {
        productService.addProduct(productDTO);
        return ResponseHandler.generateResponse("Product created succesfull added", HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar producto por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchProduct(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && productService.searchProduct(id) != null && productRepository.exists(id))
            response = ResponseEntity.ok(productService.searchProduct(id));
        else
            response = ResponseHandler.generateResponse("Product not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar producto")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editProduct(@RequestBody ProductDTO productDTO) {
        ResponseEntity<Object> response = null;

        if (productDTO.getId() != null && productService.searchProduct(productDTO.getId()) != null && productRepository.exists(productDTO.getId())) {
            productService.editProduct(productDTO);
            response = ResponseHandler.generateResponse("Product successfull edited", HttpStatus.OK);
        } else
            response = ResponseHandler.generateResponse("Product not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation( security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar producto")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Integer id) throws ResourceNotFoundException {
        ResponseEntity<Object> response = null;
        if (productService.searchProduct(id) != null && productRepository.exists(id))  {

                productService.deleteProduct(id);
                response = ResponseHandler.generateResponse("Product successfull deleted",HttpStatus.NO_CONTENT);

        } else {
            response = ResponseHandler.generateResponse("Product not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Get page of products",
            parameters = { @Parameter(in = ParameterIn.QUERY, name = "page", description = "Page"),
                    @Parameter(in = ParameterIn.QUERY, name = "size", description = "Size") },
            responses = {
                    @ApiResponse(responseCode = "200",description = "Successful Operation",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ProductPageDTO.class)))})
    @GetMapping ("/list")
    public PageResponseDTO<ProductDTO> getProducts(@PageableDefault(size = 100,page = 0) @ParameterObject Pageable pageable) {
        return productService.getProducts(pageable);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Busca productos por nombre o marca")
    @GetMapping("/serched/{value}")
    public List<ProductDTO> searchByProductNameOrBrand(@PathVariable String value) {
        List<Product> products = productRepository.findByProductNameOrBrand(value);
        List<ProductDTO> productsDTO = products.stream()
                .map(product -> mapper.convertValue(product, ProductDTO.class))
                .collect(Collectors.toList());
        return productsDTO;
    }

}