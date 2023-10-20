package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Feature;
import com.DigitalBooking.model.dto.FeatureDTO;

import java.util.Set;

public interface FeatureService {

    Feature addFeature(FeatureDTO featureDTO);

    FeatureDTO searchFeature(Integer id);

    void editFeature(FeatureDTO featureDTO);

    void deleteFeature(Integer id) throws ResourceNotFoundException;

    Set<FeatureDTO> listFeatures();
}
