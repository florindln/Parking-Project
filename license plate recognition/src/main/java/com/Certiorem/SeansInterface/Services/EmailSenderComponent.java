package com.Certiorem.SeansInterface.Services;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Max;
import java.util.List;

@EnableScheduling
@Component
class EmailSenderComponent {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ProtoSeanRepo protoSeanRepo;


    public void sendEmail(String toEmail, String body, String subject){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("1234");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);

        System.out.println("Mail Sent to " + toEmail);

    }

    @Scheduled(fixedDelay = 60000)
    public void NotifyByEmail(){
        List<ProtoSean> visitors = protoSeanRepo.findAll();

        visitors.forEach(visitor ->{
            if(visitor.getArrived() == 1){
                if(visitor.getHostNotified() != 1){
                    this.sendEmail(visitor.getHostEmail(), visitor.getVisitor() + " has arrived!", "A visitor has arrived");
                    visitor.setHostNotified(1);
                    protoSeanRepo.save(visitor);
                }
            }
        });
    }
}
