package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Feature;
import com.DigitalBooking.model.dto.FeatureDTO;
import com.DigitalBooking.repository.FeatureRepository;
import com.DigitalBooking.service.interfaces.FeatureService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService {

    private final FeatureRepository featureRepository;
    private final ObjectMapper mapper;
    private static  final Logger log= Logger.getLogger(FeatureServiceImpl.class);

    @Override
    public Feature addFeature(FeatureDTO featureDTO) {
        Feature feature = null;
        if(featureDTO.getId() != null) {
            feature = featureRepository.findById(featureDTO.getId()).orElse(null);
        }
        if(feature == null) {
            feature = mapper.convertValue(featureDTO,Feature.class);
            feature = featureRepository.save(feature);
            log.info("Feature has been created");
        }
        return feature;
    }

    @Override
    public FeatureDTO searchFeature(Integer id) {
        Optional<Feature> feature = featureRepository.findById(id);
        FeatureDTO featureDTO = null;
        if(feature.isPresent())
            featureDTO = mapper.convertValue(feature, FeatureDTO.class);
        log.info("Feature "+id+" has been found");

        return featureDTO;
    }

    @Override
    public void editFeature(FeatureDTO featureDTO) {
        Feature feature = mapper.convertValue(featureDTO,Feature.class);
        log.info("Feature "+featureDTO.getName()+" has been updated");
        featureRepository.save(feature);
    }

    @Override
    public void deleteFeature(Integer id) throws ResourceNotFoundException {
        if (searchFeature(id) == null)
            throw new ResourceNotFoundException("No existe caracteristica con id "+id);
        log.info("Feature "+id+" has been deleted");
        featureRepository.deleteById(id);
    }

    @Override
    public Set<FeatureDTO> listFeatures() {
        List<Feature> features = featureRepository.findAll();
        Set<FeatureDTO> featuresDTO = new HashSet<>();

        for (Feature feature:features) {
            featuresDTO.add(mapper.convertValue(feature, FeatureDTO.class));
        }
        log.info("Feature list has been created");
        return  featuresDTO;
    }
}
