package com.DigitalBooking.service.impl;


import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Product;
import com.DigitalBooking.model.Score;
import com.DigitalBooking.model.dto.ProductDTO;
import com.DigitalBooking.model.dto.ScoreDTO;
import com.DigitalBooking.repository.ScoreRepository;
import com.DigitalBooking.service.interfaces.ProductService;
import com.DigitalBooking.service.interfaces.ScoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
@AllArgsConstructor

public class ScoreServiceImpl implements ScoreService {

    private final ScoreRepository scoreRepository;

    private final ObjectMapper mapper;

    private final   ProductService productService;
    private static  final Logger log= Logger.getLogger(ScoreServiceImpl.class);



    @Override
    public Score addScore(ScoreDTO scoreDTO) {
        Score score = null;

        if (scoreDTO.getId() != null) {
            score = scoreRepository.findById(scoreDTO.getId()).orElse(null);
        }
        if (score == null) {
            score = mapper.convertValue(scoreDTO, Score.class);

            score = scoreRepository.save(score);
            log.info("Score has been saved");


        }

        Double resultado=  CalcularScore(findByProduct(scoreDTO.getProduct().getId())) ;
        double result= (double) Math.round(resultado*10)/10;

        Product product;
        product = productService.searchProduct(scoreDTO.getProduct().getId());
        product.setAverageScore(result);
        ProductDTO productDTO12;
        productDTO12 = mapper.convertValue(product,ProductDTO.class);

        productService.editProduct(productDTO12);
        log.info("Score has been added to product");

        return score;
        }

    @Override
    public ScoreDTO searchScore(Integer id) {
        Optional<Score> score = scoreRepository.findById(id);
        ScoreDTO scoreDTO = null;
        if(score.isPresent())
            scoreDTO = mapper.convertValue(score,ScoreDTO.class);
        log.info("Score has been found");

        return scoreDTO;
    }
    @Override
    public List <Score> findByProduct(Integer id) {

        List <Score> scores = scoreRepository.searchProductById(id);
        List <Score> scoresDTO = new ArrayList<>();
          Double  scoreSuma = null;

        for (Score score : scores ){
            scoresDTO.add(score);
        }
        log.info("List of score by product has been created");

        return scoresDTO;
    }

    @Override
    public Double CalcularScore(List<Score> params) {
        if (params.isEmpty()) {
            return 0.0;
        }

        Double totalScore = 0.0;
        int numberOfScores = params.size();

        for (int i=0; i < params.size(); i++) {
            totalScore = totalScore + params.get(i).getValue();
        }
        log.info("score has been calculated");

        return (double) totalScore / numberOfScores;
    }


    @Override
    public void editScore(ScoreDTO scoreDTO) {
        Score score = mapper.convertValue(scoreDTO,Score.class);
        scoreRepository.save(score);
        log.info("Score has been update");
    }

    @Override
    public void deleteScore(Integer id) throws ResourceNotFoundException {
        if (searchScore(id) == null)
            throw new ResourceNotFoundException("No existe Score con id "+id);

        scoreRepository.deleteById(id);
        log.info("Score has been deleted");
    }

    @Override
    public List<ScoreDTO> findAll() {
        List<Score>scores=scoreRepository.findAll();
        List<ScoreDTO>scoreDTO= new ArrayList<>();
        for (Score score : scores){
            if (score.getValue() == null)
                score.setValue(0.0);
            scoreDTO.add(score.toDto());
        }
        return scoreDTO;
    }

}
