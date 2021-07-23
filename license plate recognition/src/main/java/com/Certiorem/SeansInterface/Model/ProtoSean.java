package com.Certiorem.SeansInterface.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Entity (name = "ParkingInfo")
@Data
public class ProtoSean {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    private Long id;

    private String numberPlate;

    private String visitor;

    private String phnNumber;

    private String hostEmail;

    private int arrived;

    private int hostNotified;

    private int secretaryNotified;

    @Column(columnDefinition = "integer default 1")
    private int hasWhatsApp;

    @Temporal(TemporalType.TIMESTAMP) //TIMESTAMP == date + time
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Date expectedAt;

    public ProtoSean() {
    }

    public ProtoSean(Long id, String numberPlate, String visitor, String phnNumber, String hostEmail, int arrived, int hostNotified, int secretaryNotified, int hasWhatsApp, Date expectedAt) {
        this.id = id;
        this.numberPlate = numberPlate;
        this.visitor = visitor;
        this.phnNumber = phnNumber;
        this.hostEmail = hostEmail;
        this.arrived = arrived;
        this.hostNotified = hostNotified;
        this.secretaryNotified = secretaryNotified;
        this.hasWhatsApp = hasWhatsApp;
        this.expectedAt = expectedAt;
    }
}
