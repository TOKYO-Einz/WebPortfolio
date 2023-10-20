package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.FavoriteDTO;
import com.DigitalBooking.service.interfaces.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/favorites")
@AllArgsConstructor
public class FavoriteController {


    private final FavoriteService favoriteService;

    @GetMapping("/list")
    public ResponseEntity<List<FavoriteDTO>> listFavorites(){
        List<FavoriteDTO> favoritesList = favoriteService.listFavorites();
        return ResponseEntity.ok(favoritesList);
    }

    @Operation(security = {@SecurityRequirement(name = "bearer-key") },summary = "Registrar nueva favorito")
    @PostMapping("/create")
    public ResponseEntity<Object> addFavorite(@RequestBody FavoriteDTO favoriteDTO){
        favoriteService.addFavorite(favoriteDTO);
        return ResponseHandler.generateResponse("Favorite successfull added",HttpStatus.CREATED);
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar favorito")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFavorite(@PathVariable Integer id_product, Integer id_user) throws ResourceNotFoundException {
        favoriteService.deleteFavorite(id_product,id_user);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
    }

