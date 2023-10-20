package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Location;
import com.DigitalBooking.model.dto.LocationDTO;
import com.DigitalBooking.repository.LocationRepository;
import com.DigitalBooking.service.interfaces.LocationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor

public class LocationServiceImpl implements LocationService {


    private final LocationRepository locationRepository;
    private final ObjectMapper mapper;
    private final ConversionService conversionService;
    private static  final Logger log= Logger.getLogger(LocationServiceImpl.class);


    @Override
    public Location addLocation(LocationDTO locationDTO) {
        Location location = null;
        if (locationDTO.getId() != null) {
            location = locationRepository.findById(locationDTO.getId()).orElse(null);
        }
        if (location == null) {
            location = mapper.convertValue(locationDTO, Location.class);
            location = locationRepository.save(location);
            log.info("Location "+locationDTO.getAddress()+" has been created");
        }
        return location;
    }

    @Override
    public LocationDTO searchLocation(Integer id) {
        Optional<Location> location = locationRepository.findById(id);
        LocationDTO locationDTO = null;
        if (location.isPresent())
            locationDTO = mapper.convertValue(location, LocationDTO.class);
        log.info("Location "+id+" has been found");

        return locationDTO;
    }

    @Override
    public void editLocation(LocationDTO locationDTO) {
        Location location = mapper.convertValue(locationDTO, Location.class);
        locationRepository.save(location);
        log.info("Location "+locationDTO.getId()+" has been updated");
    }

    @Override
    public void deleteLocation(Integer id) throws ResourceNotFoundException {
        if (searchLocation(id) == null)
            throw new ResourceNotFoundException("Location not found " + id);
        locationRepository.deleteById(id);
        log.info("Location "+id+" has been deleted");
    }


    @Override
    public Set<LocationDTO> listLocation() {
        List<Location> locations = locationRepository.findAll();
        Set<LocationDTO> locationsDTO = new HashSet<>();

        for (Location location : locations) {
            locationsDTO.add(mapper.convertValue(location, LocationDTO.class));
        }
        log.info("Location list has been created");
        return locationsDTO;
    }

}

