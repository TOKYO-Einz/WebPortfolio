package com.DigitalBooking.model.dto;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationDTO {

    private Integer id;

    private String pickUpTime;

    private String startDay;

    private String endDay;

    private String comments;

    private ProductSmallDTO product;


}
