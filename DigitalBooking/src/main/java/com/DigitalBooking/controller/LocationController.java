package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.Location;
import com.DigitalBooking.model.dto.LocationDTO;
import com.DigitalBooking.service.interfaces.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin (origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/locations")
@AllArgsConstructor
public class LocationController {


    private final LocationService locationService;


    @Operation(security = {@SecurityRequirement(name = "bearer-key")}, summary = "Registrar nueva Locacion")
    @PostMapping("/create")
    public ResponseEntity<Object> addLocation(@RequestBody LocationDTO locationDTO) {
         locationService.addLocation(locationDTO);
        return ResponseHandler.generateResponse("Location successfull added", HttpStatus.CREATED);
    }

    @Operation(security = {@SecurityRequirement(name = "bearer-key")}, summary = "Eliminar locacion")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (locationService.searchLocation(id) != null) {
            locationService.deleteLocation(id);
            response = ResponseHandler.generateResponse("Location successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Location not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = {@SecurityRequirement(name = "bearer-key")}, summary = "Buscar locacion por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchLocation(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && locationService.searchLocation(id) != null)
            response = ResponseEntity.ok(locationService.searchLocation(id));
        else
            response = ResponseHandler.generateResponse("Location not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = {@SecurityRequirement(name = "bearer-key")}, summary = "Editar locacion")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editLocation(@RequestBody LocationDTO locationDTO) {
        ResponseEntity<Object> response = null;

        if (locationDTO.getId() != null && locationService.searchLocation(locationDTO.getId()) != null) {
            locationService.editLocation(locationDTO);
            response = ResponseHandler.generateResponse("Location successfull edited", HttpStatus.OK);
        } else
            response = ResponseHandler.generateResponse("Location not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(security = {@SecurityRequirement(name = "bearer-key")}, summary = "Listar todas las localizaciones")
    @GetMapping("/list")
    public ResponseEntity<Object> listLocations() {
        return ResponseEntity.ok(locationService.listLocation());


    }
}
