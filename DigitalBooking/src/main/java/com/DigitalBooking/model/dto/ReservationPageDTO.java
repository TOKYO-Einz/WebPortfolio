package com.DigitalBooking.model.dto;

import java.util.List;

public class ReservationPageDTO extends  PageResponseDTO<ReservationDTO> {

        public ReservationPageDTO(List<ReservationDTO> content) {
            super(content);
        }

}
