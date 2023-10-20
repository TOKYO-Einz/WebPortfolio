package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.CategoryDTO;
import com.DigitalBooking.model.dto.CategoryPageDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;

import com.DigitalBooking.repository.CategoryRepository;
import com.DigitalBooking.service.interfaces.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin (origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/categories")
@AllArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar nueva categoría")
    @PostMapping("/create")
    public ResponseEntity<Object> addCategory(@RequestBody CategoryDTO categoryDTO) {
        categoryService.addCategory(categoryDTO);
        return ResponseHandler.generateResponse("Caategory successfull added",HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar categoría")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (categoryService.searchCategory(id) != null && categoryRepository.exists(id)) {
            categoryService.deleteCategory(id);
            response = ResponseHandler.generateResponse("Category successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Category not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar categoría por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchCategory(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && categoryService.searchCategory(id) != null && categoryRepository.exists(id))
            response = ResponseEntity.ok(categoryService.searchCategory(id));
        else
            response = ResponseHandler.generateResponse("Category not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar categoría")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editCategory(@RequestBody CategoryDTO categoryDTO) {
        ResponseEntity<Object> response = null;

        if (categoryDTO.getId() != null && categoryService.searchCategory(categoryDTO.getId()) != null && categoryRepository.exists(categoryDTO.getId())) {
            categoryService.editCategory(categoryDTO);
            response = ResponseHandler.generateResponse("Category successfull edited", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Category not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Get page of categories",
            parameters = { @Parameter(in = ParameterIn.QUERY, name = "page", description = "Page"),
                    @Parameter(in = ParameterIn.QUERY, name = "size", description = "Size") },
            responses = {
                    @ApiResponse(responseCode = "200",description = "Successful Operation",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CategoryPageDTO.class)))})
    @GetMapping ("/list")
    public PageResponseDTO<CategoryDTO> getCategories(@PageableDefault(size = 10,page = 0) @ParameterObject Pageable pageable) {
        return categoryService.getCategories(pageable);
    }
/**
    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Listar todas las categorías")
    @GetMapping("/list")
    public ResponseEntity<Object> listCategories() {
        return ResponseEntity.ok(categoryService.listCategories());
    }**/
}
