import React, { useEffect, useState } from 'react'
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from '@material-ui/icons/Info';
import Notifier from "react-desktop-notifications";
import ProtoSeanService from '../Services/ProtoSeanService';
import axios from 'axios';

const StatusComponent = ({protoSean}) => {

    const [listening, setListening] = useState(false);
    const [currentDateTime] = useState(new Date());
    const [appointment, setAppointment] = useState(protoSean);
    

    // let eventSource = undefined;

    // useEffect(() => {
        
    //     if (!listening) {
    //         eventSource = new EventSource('http://localhost:8081/event/arrived');

    //         eventSource.onopen = (event) => {
    //             console.log("Connection opened");
    //         }

    //         eventSource.onmessage = (event) => {

    //             var visitors = JSON.parse(event.data);
                
    //             visitors.forEach(entity => {
    //                 if(appointment.id === entity.id){
    //                     if(appointment !== entity){
    //                         setAppointment(entity)
    //                     }
    //                 }
    //             });
    //         }

    //         eventSource.onerror = (event) => {
    //             console.log(event.target.readyState);
    //             if(event.target.readyState === EventSource.CLOSED){
    //                 console.log('eventSource closed(' + event.target.readyState +')')
    //             }
    //             eventSource.close();
    //         }

    //         setListening(true)
    //     }

    //     return () => {
    //             eventSource.close();
    //             console.log('eventSource closed')
    //     }
    // }, [])

    const showNewNotification = (visitor) =>{
        Notifier.start("A visitor has arrived!",visitor + " has just arrived","www.google.com", "/SiouxLogo.png");
    }

    const renderStatus = (appointmentId,expectedAtValue, arrivedCheck, notifiedCheck, visitor) => {

        var expectedAtDateTime = new Date(expectedAtValue);
        
        if(arrivedCheck === 1){
            
            if(notifiedCheck !== 1){
                console.log(appointmentId);
                showNewNotification(visitor);
                ProtoSeanService.setNotified(appointmentId);
            }
            
            return ( <Tooltip title="Arrived" placement="left" arrow>
            <CheckCircleIcon style={{ color: "green" }} />
            </Tooltip>);
        }
        else if (arrivedCheck !== 1){
              if (expectedAtDateTime < currentDateTime) {
                    return ( <Tooltip title="Late" placement="left" arrow> 
                    <ErrorIcon color="error" /> 
                    </Tooltip> )
              }
              else if (expectedAtDateTime > currentDateTime) {
                    return( <Tooltip title="Expected" placement="left" arrow>
                    <InfoIcon style={{ color: "orange" }} /> 
                    </Tooltip>);
              }
        }
    }

    return renderStatus(protoSean.id,appointment.expectedAt, appointment.arrived, appointment.secretaryNotified, appointment.visitor);

}

export default StatusComponent