package com.Certiorem.SeansInterface.Messaging;

// Install the Java helper library from twilio.com/docs/java/install


import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class WapMessage implements MessageInterface{
    // Find your Account Sid and Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = "1234";
    public static final String AUTH_TOKEN = "1234";
    public static final String SENDER="1234";  //gateway from twilio

    public void sendMessage(String receiver,String spot) {
        // my receiver 1234
        //default message  "Your appointment is coming up on July 9999 at 3PM"
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber("whatsapp:"+receiver),
                new com.twilio.type.PhoneNumber("whatsapp:"+WapMessage.SENDER),
                "Your parkingSpot code is "+spot)
                .create();

        System.out.println(message.getSid());
    }
}
