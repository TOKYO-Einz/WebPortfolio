package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Reservation;
import com.DigitalBooking.model.User;
import com.DigitalBooking.model.dto.PageResponseDTO;
import com.DigitalBooking.model.dto.ReservationDTO;
import com.DigitalBooking.repository.ReservationRepository;
import com.DigitalBooking.service.interfaces.ReservationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.log4j.Logger;
import org.springframework.core.convert.ConversionService;

import org.springframework.data.domain.Pageable;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ObjectMapper mapper;
    private final ConversionService conversionService;
    private static  final Logger log= Logger.getLogger(ReservationServiceImpl.class);



    @Override
    public Reservation addReservation(ReservationDTO reservationDTO) {
        Reservation reservation = null;
        if(reservationDTO.getId() != null) {
            reservation = reservationRepository.findById(reservationDTO.getId()).orElse(null);
        }
        if(reservation == null) {
            User userR = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            reservation = mapper.convertValue(reservationDTO,Reservation.class);
            reservation.setUser(userR);
            reservation = reservationRepository.save(reservation);
            log.info("Reservation "+reservationDTO.getId()+"  has been created");
        }
        return reservation;
    }

    @Override
    public ReservationDTO searchReservation(Integer id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        ReservationDTO reservationDTO = null;
        if(reservation.isPresent())
            reservationDTO = mapper.convertValue(reservation, ReservationDTO.class);
        log.info("Reservation "+id+" has been found");

        return reservationDTO;
    }

    @Override
    public void editReservation(ReservationDTO reservationDTO) {
        Reservation reservation = mapper.convertValue(reservationDTO,Reservation.class);
        reservationRepository.save(reservation);
        log.info("Reservation "+reservationDTO.getId()+" has been updated");
    }

    @Override
    public void deleteReservation(Integer id) throws ResourceNotFoundException {
        reservationRepository.softDelete(id);
        log.info("Reservation "+id+" has been deleted");
        if (searchReservation(id) == null )
            throw new ResourceNotFoundException("Reservation not found " + id);
    }



     @Override
     public Set<ReservationDTO> listReservations() {
     List<Reservation> reservations = reservationRepository.findAll();
     Set<ReservationDTO> reservationDTOS = new HashSet<>();

     for (Reservation reservation:  reservations) {
     reservationDTOS.add(mapper.convertValue(reservation, ReservationDTO.class));
     }
     log.info("Reservation list has been created");
     return  reservationDTOS;
     }

    @Override
    public List <Reservation> findByProduct(Integer id) {

        List <Reservation> reservations = reservationRepository.searchReservationByIdProduct(id);
        List <Reservation> reservationsDTO = new ArrayList<>();

        for (Reservation reservation : reservations ){
            reservationsDTO.add(reservation);
        }

        log.info("List of reservation by product has been created");

        return reservationsDTO;
    }

    @Override
    public PageResponseDTO<ReservationDTO> getReservations(Pageable pageable) {

        var page = reservationRepository.findByDeleted(false, pageable);
        log.info("List of Reservation has been paginated");
        return new PageResponseDTO<>(
                page.getContent().stream()
                        .map(reservation -> conversionService.convert(reservation, ReservationDTO.class)).toList()
                , page.getPageable()
                , page.getTotalElements());

    }

    @Override
    public List <Reservation> findByUser(Integer id) {

        List <Reservation> reservations = reservationRepository.searchReservationByIdUser(id);
        List <Reservation> reservationsDTO = new ArrayList<>();

        for (Reservation reservation : reservations ){
            reservationsDTO.add(reservation);
        }
        log.info("List of Reservation by user has been create");

        return reservationsDTO;
    }


}
