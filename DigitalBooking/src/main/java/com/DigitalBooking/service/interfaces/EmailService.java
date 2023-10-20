package com.DigitalBooking.service.interfaces;

public interface EmailService {
    void sendMail(String email, String subject, String body);
}
