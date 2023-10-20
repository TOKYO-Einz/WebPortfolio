package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.FeatureDTO;
import com.DigitalBooking.service.interfaces.FeatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/features")
@AllArgsConstructor
@CrossOrigin (origins = "*", allowedHeaders = "*")
public class FeaturesController {


    private final FeatureService featureService;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar nueva caracteristica")
    @PostMapping("/create")
    public ResponseEntity<Object> addFeature(@RequestBody FeatureDTO featureDTO) {
        featureService.addFeature(featureDTO);
        return ResponseHandler.generateResponse("Feature successfull added", HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar caracteristica")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteFeature(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (featureService.searchFeature(id) != null) {
            featureService.deleteFeature(id);
            response = ResponseHandler.generateResponse("Feature successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Feature not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar caracteristica por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchCategory(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && featureService.searchFeature(id) != null)
            response = ResponseEntity.ok(featureService.searchFeature(id));
        else
            response = ResponseHandler.generateResponse("Feature not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar caracteristica")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editFeature(@RequestBody FeatureDTO featureDTO) {
        ResponseEntity<Object> response = null;

        if (featureDTO.getId() != null && featureService.searchFeature(featureDTO.getId()) != null) {
            featureService.editFeature(featureDTO);
            response = ResponseHandler.generateResponse("Feature successfull edited", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Feature not found", HttpStatus.NOT_FOUND);
        return response;
    }



     @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Listar todas las caracteristicas")
     @GetMapping("/list")
     public ResponseEntity<Object> listFeatures() {
     return ResponseEntity.ok(featureService.listFeatures());
     }
}
