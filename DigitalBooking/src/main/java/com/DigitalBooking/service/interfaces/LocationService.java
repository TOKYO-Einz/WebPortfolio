package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Location;
import com.DigitalBooking.model.dto.LocationDTO;
import com.DigitalBooking.model.dto.PageResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface LocationService {


    Location addLocation(LocationDTO locationDTO);

    LocationDTO searchLocation(Integer id);

    void editLocation(LocationDTO locationDTO);

    void deleteLocation(Integer id) throws ResourceNotFoundException;

    Set<LocationDTO> listLocation();

}
