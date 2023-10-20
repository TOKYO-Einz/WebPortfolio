package com.DigitalBooking;

import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.Clock;

@SpringBootApplication
@AllArgsConstructor
public class DigitalBookingApplication {
	public static void main(String[] args) {
		SpringApplication.run(DigitalBookingApplication.class, args);
	}

	@Bean
	public Clock clock(){
		return Clock.systemDefaultZone();
	}


}
