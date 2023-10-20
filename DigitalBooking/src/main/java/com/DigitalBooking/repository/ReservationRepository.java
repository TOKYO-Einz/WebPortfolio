package com.DigitalBooking.repository;


import com.DigitalBooking.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository <Reservation, Integer> {


    @Query(value = "SELECT * FROM reservation r WHERE r.product_id = :value" , nativeQuery = true)
    List<Reservation> searchReservationByIdProduct(@Param("value")Integer value);

    @Query(value = "SELECT * FROM reservation r WHERE r.user_id = :value" , nativeQuery = true)
    List<Reservation> searchReservationByIdUser(@Param("value")Integer value);


    @Query("update Reservation r set r.deleted = true where r.id=?1 and r.deleted = false")
    @Modifying
    int softDelete(Integer id);

    @Query("SELECT COUNT(r) > 0 FROM Reservation r WHERE r.id = :id and r.deleted = false")
    boolean exists(@Param("id") Integer id);

    Page<Reservation> findByDeleted(Boolean deleted, Pageable pageable);

}
