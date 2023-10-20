package com.DigitalBooking.repository;

import com.DigitalBooking.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    @Query(value = "SELECT f FROM Favorite f ORDER BY f.id")
    List<Favorite> findAll();
}
