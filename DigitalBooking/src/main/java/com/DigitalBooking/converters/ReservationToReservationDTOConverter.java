package com.DigitalBooking.converters;
import com.DigitalBooking.model.Reservation;
import com.DigitalBooking.model.dto.ReservationDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ReservationToReservationDTOConverter implements Converter<Reservation, ReservationDTO> {



    @Override
    public ReservationDTO convert(Reservation source) {
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setId(source.getId());
        reservationDTO.setPickUpTime(source.getPickUpTime());
        reservationDTO.setStartDay(source.getStartDay());
        reservationDTO.setEndDay(source.getEndDay());
        return reservationDTO;
    }
}
