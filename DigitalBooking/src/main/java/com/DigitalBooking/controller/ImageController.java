package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.Image;
import com.DigitalBooking.model.dto.ImageDTO;
import com.DigitalBooking.service.interfaces.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/images")
@AllArgsConstructor
public class ImageController {


    private final ImageService imageService;

    @Operation(summary = "Registrar nueva imagen")
    @PostMapping("/create")
    public ResponseEntity<Object> addImage(@RequestBody Image image) {
        imageService.addImage(image);
        return ResponseHandler.generateResponse("Image successfull added", HttpStatus.CREATED);
    }

    @Operation(summary = "Eliminar imagen")
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteImage(@PathVariable Integer id)throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (imageService.searchImage(id) != null) {

                imageService.deleteImage(id);

            response = ResponseHandler.generateResponse("Image successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Image not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Buscar imagen por ID")
    @GetMapping("/search")
    public ResponseEntity<Object> searchImage(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && imageService.searchImage(id) != null)
            response = response = ResponseEntity.ok(imageService.searchImage(id));
        else
            response = ResponseHandler.generateResponse("Image not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar imagen")
    @PutMapping("/edit")
    public ResponseEntity<Object> editImage(@RequestBody ImageDTO imageDTO) {
        ResponseEntity<Object> response = null;

        if (imageDTO.getId() != null && imageService.searchImage(imageDTO.getId()) != null) {
            imageService.editImage(imageDTO);
            response = ResponseHandler.generateResponse("Image successfull updated", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Image not found", HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Listar todas las imagenes")
    @GetMapping("/list")
    public ResponseEntity<Object> listImages() {
        return ResponseEntity.ok(imageService.listImages());
    }

}
