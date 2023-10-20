package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.BrandDTO;
import com.DigitalBooking.repository.BrandRepository;
import com.DigitalBooking.service.interfaces.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




@CrossOrigin (origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/brands")
@AllArgsConstructor
public class BrandController {

    private final BrandService brandService;
    private final BrandRepository brandRepository;



    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar nueva marca")
    @PostMapping("/create")
    public ResponseEntity<Object> addBrand(@RequestBody BrandDTO brandDTO) {
        brandService.addBrand(brandDTO);
        return ResponseHandler.generateResponse("Brand successfull added", HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar marca")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteBrand(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (brandService.searchBrand(id) != null && brandRepository.exists(id)) {
            brandService.deleteBrand(id);
            response = ResponseHandler.generateResponse("Brand successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Brand not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar marca por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchBrand(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && brandService.searchBrand(id) != null && brandRepository.exists(id))
            response = ResponseEntity.ok(brandService.searchBrand(id));
        else
            response = ResponseHandler.generateResponse("Brand not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar marca")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editBrand(@RequestBody BrandDTO brandDTO) {
        ResponseEntity<Object> response = null;

        if (brandDTO.getId() != null && brandService.searchBrand(brandDTO.getId()) != null && brandRepository.exists(brandDTO.getId())) {
            brandService.editBrand(brandDTO);
            response = ResponseHandler.generateResponse("Brand successfull edited", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Brand not found", HttpStatus.NOT_FOUND);
        return response;
    }



     @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Listar todas las marcas")
     @GetMapping("/list")
     public ResponseEntity<Object> listBrands() {
     return ResponseEntity.ok(brandService.listBrands());
     }
}
