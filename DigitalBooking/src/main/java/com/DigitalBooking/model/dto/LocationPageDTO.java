package com.DigitalBooking.model.dto;

import java.util.List;

public class LocationPageDTO extends PageResponseDTO<LocationDTO>{

    public LocationPageDTO(List<LocationDTO> content) {
        super(content);
    }
}
