package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.BranchDTO;
import com.DigitalBooking.repository.BranchRepository;
import com.DigitalBooking.service.interfaces.BranchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/branches")
@AllArgsConstructor
public class BranchController {

    private final BranchService branchService;
    private final BranchRepository branchRepository;


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar nueva sucursal")
    @PostMapping("/create")
    public ResponseEntity<Object> addBranch(@RequestBody BranchDTO branchDTO) {
        branchService.addBranch(branchDTO);
        return ResponseHandler.generateResponse("Branch successfull added", HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar sucursal")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteBranch(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (branchService.searchBranch(id) != null  && branchRepository.exists(id)) {
            branchService.deleteBranch(id);
            response = ResponseHandler.generateResponse("Branch successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Branch not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar sucursal por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchBranch(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && branchService.searchBranch(id) != null  && branchRepository.exists(id))
            response = ResponseEntity.ok(branchService.searchBranch(id));
        else
            response = ResponseHandler.generateResponse("Branch not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar categoría")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editBranch(@RequestBody BranchDTO branchDTO) {
        ResponseEntity<Object> response = null;

        if (branchDTO.getId() != null && branchService.searchBranch(branchDTO.getId()) != null  && branchRepository.exists(branchDTO.getId())) {
            branchService.editBranch(branchDTO);
            response = ResponseHandler.generateResponse("Branch successfull edited", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Branch not found", HttpStatus.NOT_FOUND);
        return response;
    }



 @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Listar todas las categorías")
 @GetMapping("/list")
 public ResponseEntity<Object> listBranches() {

         return ResponseEntity.ok(branchService.listBranches());
 }

}
