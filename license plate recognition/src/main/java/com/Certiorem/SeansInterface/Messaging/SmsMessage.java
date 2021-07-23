package com.Certiorem.SeansInterface.Messaging;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class SmsMessage implements MessageInterface {

    // Find your Account Sid and Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = "1234";
    public static final String AUTH_TOKEN = "1234";
    public static final String SENDER="1234";   //my trial number from twilio

    public void sendMessage(String receiver,String spot) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(receiver),
                new com.twilio.type.PhoneNumber(SmsMessage.SENDER),
                "Your parkingSpot code is "+spot)
                .create();

        System.out.println(message.getSid());
    }
}
