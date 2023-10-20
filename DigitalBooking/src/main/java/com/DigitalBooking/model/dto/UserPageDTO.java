package com.DigitalBooking.model.dto;

import java.util.List;

public class UserPageDTO extends PageResponseDTO<FullUserDTO> {
    public UserPageDTO(List<FullUserDTO> content) {
        super(content);
    }
}
