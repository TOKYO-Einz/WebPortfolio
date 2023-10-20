package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Score;
import com.DigitalBooking.model.dto.ScoreDTO;

import java.util.List;

public interface ScoreService {
    Score addScore(ScoreDTO scoreDTO);

    ScoreDTO searchScore(Integer id);

    Double CalcularScore(List<Score> params);


    void editScore(ScoreDTO scoreDTO);

    void deleteScore (Integer id) throws ResourceNotFoundException;

    List<ScoreDTO> findAll();
   /* List<ScoreDTO> findByUser(Integer id_user);*/

    List<Score> findByProduct(Integer id);


}


