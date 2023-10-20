package com.DigitalBooking.service.impl;

import com.DigitalBooking.config.MailProperties;
import com.DigitalBooking.exceptions.MailSenderException;
import com.DigitalBooking.service.interfaces.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@EnableAsync
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;
    private final MailProperties mailProperties;
    private static  final Logger log= Logger.getLogger(EmailServiceImpl.class);

    @Override
    @Async
    public void sendMail(String to, String subject, String body) {
        log.info("Begin sendMail");

        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setText(body, true);
            helper.setSubject(subject);
            helper.setFrom(mailProperties.username());
            emailSender.send(message);
            log.info("Email has been sent");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new MailSenderException(e);
        }
    }
}
