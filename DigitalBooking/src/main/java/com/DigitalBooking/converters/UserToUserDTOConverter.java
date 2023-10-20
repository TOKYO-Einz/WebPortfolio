package com.DigitalBooking.converters;


import com.DigitalBooking.model.User;
import com.DigitalBooking.model.dto.FullUserDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserToUserDTOConverter implements Converter<User, FullUserDTO> {

    @Override
    public FullUserDTO convert(User source) {
        FullUserDTO fullUserDTO = new FullUserDTO();
        fullUserDTO.setId(source.getId());
        fullUserDTO.setName(source.getName());
        fullUserDTO.setLastname(source.getLastname());
        fullUserDTO.setEmail(source.getEmail());
        fullUserDTO.setPassword(source.getPassword());
        fullUserDTO.setDate(source.getDate());
        fullUserDTO.setRole(source.getRole());
        fullUserDTO.setLocation(source.getLocation());
        fullUserDTO.setDocument(source.getDocument());

        return fullUserDTO;
    }

}
