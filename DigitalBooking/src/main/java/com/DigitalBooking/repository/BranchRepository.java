package com.DigitalBooking.repository;

import com.DigitalBooking.model.Branch;
import com.DigitalBooking.model.Brand;
import com.DigitalBooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {

    @Query("from Branch b where b.name =:name")
    User findByName(@Param("name") String name);

    @Query("update Branch b set b.deleted = true where b.id=?1 and b.deleted = false")
    @Modifying
    int softDelete(Integer id);

    @Query("SELECT COUNT(b) > 0 FROM Branch b WHERE b.id = :id and b.deleted = false")
    boolean exists(@Param("id") Integer id);

    @Query("SELECT b FROM Branch b WHERE b.deleted = false")
    List<Branch> findByDelete();

}
