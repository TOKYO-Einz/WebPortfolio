package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Reservation;


import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.model.dto.ReservationDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface ReservationService {

    Reservation addReservation(ReservationDTO reservationDTO);

    ReservationDTO searchReservation(Integer id);

    void editReservation(ReservationDTO reservationDTO);

    void deleteReservation(Integer id) throws ResourceNotFoundException;

    Set<ReservationDTO> listReservations();

    List<Reservation> findByProduct(Integer id);

    List<Reservation> findByUser(Integer id);
    PageResponseDTO<ReservationDTO> getReservations(Pageable pageable);
}
