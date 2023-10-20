package com.DigitalBooking;


import com.DigitalBooking.config.MailProperties;
import com.DigitalBooking.exceptions.MailSenderException;
import com.DigitalBooking.service.impl.EmailServiceImpl;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceImplTest {

    @Mock
    JavaMailSender emailSender;
    @Mock
    MailProperties mailProperties;
    @Mock
    MimeMessage message;

    @InjectMocks
    EmailServiceImpl emailService;

    @Test
    void sendEmailTest() {
        when(emailSender.createMimeMessage()).thenReturn(message);
        when(mailProperties.username()).thenReturn("user@gmail.com");
        emailService.sendMail("test@gmail.com", "Email Confirmation",
                "Confirm on the following link");
        verify(emailSender).send(any(MimeMessage.class));
    }

    @Test
    void sendEmailTestFailed() {
        when(emailSender.createMimeMessage()).thenReturn(message);
        when(mailProperties.username()).thenReturn("user@gmail.com");
        doThrow(new MailAuthenticationException("Error")).when(emailSender).send(any(MimeMessage.class));

        assertThrows(MailSenderException.class, () -> emailService.sendMail("test@gmail.com",
                "Email Confirmation",
                "Confirm on the following link"));
    }
}