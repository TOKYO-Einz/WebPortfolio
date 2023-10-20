package com.DigitalBooking.repository;

import com.DigitalBooking.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
    public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByTitle(String title);

    @Override
    Optional<Category> findById(Integer integer);

//    SOFT DELETE

    @Query("update Category c set c.deleted = true where c.id=?1 and c.deleted = false")
    @Modifying
    int softDelete(Integer id);

    @Query("SELECT COUNT(c) > 0 FROM Category c WHERE c.id = :id and c.deleted = false")
    boolean exists(@Param("id") Integer id);

    Page<Category> findByDeleted(Boolean deleted,Pageable pageable);

//    Optional<Category> findByIdAndDeleted(Integer id,Boolean deleted);


//    Page<Category> findByDeleted(Boolean deleted, Pageable pageable);



}

