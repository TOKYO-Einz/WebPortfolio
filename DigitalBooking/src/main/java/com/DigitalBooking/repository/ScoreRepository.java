package com.DigitalBooking.repository;

import com.DigitalBooking.model.Score;
import com.DigitalBooking.model.dto.ScoreDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Integer> {


    @Query(value = "SELECT * FROM scores p WHERE p.products_id = :value" , nativeQuery = true)
    List<Score> searchProductById(@Param("value")Integer value);

}
