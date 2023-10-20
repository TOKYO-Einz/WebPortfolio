package com.DigitalBooking.controller;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.handler.ResponseHandler;
import com.DigitalBooking.model.dto.ScoreDTO;
import com.DigitalBooking.service.interfaces.ScoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin (origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/scores")
@AllArgsConstructor

public class ScoreController {
    private final ScoreService scoreService;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Registrar una nueva puntuación")
    @PostMapping("/create")
    public ResponseEntity<Object> addScore(@RequestBody ScoreDTO scoreDTO) {
        scoreService.addScore(scoreDTO);


        return ResponseHandler.generateResponse("Score successfull added", HttpStatus.CREATED);
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Eliminar puntuación")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteScore(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (scoreService.searchScore(id) != null) {
            scoreService.deleteScore(id);
            response = ResponseHandler.generateResponse("puntuación successfull deleted", HttpStatus.NO_CONTENT);
        } else {
            response = ResponseHandler.generateResponse("Score not found", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Buscar puntuación por ID")
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchScore(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && scoreService.searchScore(id) != null)
            response = ResponseEntity.ok(scoreService.searchScore(id));
        else
            response = ResponseHandler.generateResponse("puntuación not found", HttpStatus.NOT_FOUND);
        return response;
    }


    @Operation(security = { @SecurityRequirement(name = "bearer-key") },summary = "Editar puntuación")
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editScore(@RequestBody ScoreDTO scoreDTO) {
        ResponseEntity<Object> response = null;

        if (scoreDTO.getId() != null && scoreService.searchScore(scoreDTO.getId()) != null) {
            scoreService.editScore(scoreDTO);
            response = ResponseHandler.generateResponse("Score successfull edited", HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse("Score not found", HttpStatus.NOT_FOUND);
        return response;
    }
    @Operation(summary = "Get list of scores")
    @GetMapping("/list")
    public  ResponseEntity<List<ScoreDTO>>findAll() {
        List<ScoreDTO> scoreDTOSet = scoreService.findAll();
        return new ResponseEntity<>(scoreDTOSet, HttpStatus.OK);
    }


}
