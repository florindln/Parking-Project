import React, { useRef, useCallback, useState, useEffect } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import InfoIcon from "@material-ui/icons/Info";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Brightness1 from "@material-ui/icons/Brightness1";
import ProtoSeanService from "../Services/ProtoSeanService";
import { useHistory } from "react-router-dom";
import Notifier from "react-desktop-notifications";
import moment from 'moment'

export default function InfiniteScrollComponent({
  records,
  currentDateTime,
  originalRecords,
  sortKeyword,
}) {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [modifiedRecords, setModifiedRecords] = useState(records);
  const [listening, setListening] = useState(false);
  const [isAscending, setIsAscending] = useState(false);

  let eventSource = undefined;
  var i = 0;
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Visible");
          setCurrentPage((previousPageNumber) => previousPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {

    if (!listening) {
      eventSource = new EventSource("http://localhost:8081/event/arrived");

      eventSource.onopen = (event) => {
        console.log("Connection opened");
      };

      eventSource.onmessage = (event) => {
        var appointments = JSON.parse(event.data);

        for (var record of originalRecords) {  // Check if there is a difference in appointments list and original records

          var appointment = appointments[i];

          if (appointment.id === record.id) {

            if (appointment.arrived !== record.arrived) {

              if (originalRecords.length === modifiedRecords.length) {
                setModifiedRecords(appointments);
              } 
            }
          }

          i++;
        }

        i = 0;
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventSource closed(" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventSource closed");
    };
  }, []);

  useEffect(() => {
    console.log(sortKeyword)
    if(sortKeyword != "") {
      sortRecords();
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    if (currentPage === 1) {
      setModifiedRecords(
        modifiedRecords.slice(indexOfFirstRecord, indexOfLastRecord)
      );
    } else {
      setModifiedRecords(
        modifiedRecords.concat(
          modifiedRecords.slice(indexOfFirstRecord, indexOfLastRecord)
        )
      );
      console.log("Page: " + currentPage);
    }


  }, [currentPage, sortKeyword]);

  const deleteRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      ProtoSeanService.deleteRecord(id).then((res) => {
        // setModifiedRecords(records.filter((protoSean) => protoSean.id !== id));
        window.location.reload(true);
      });
    }
  };

  const sortRecords = () => {
    
    if (isAscending) {
      modifiedRecords.sort((a, b) => (a[sortKeyword] < b[sortKeyword] ? 1 : -1))
      setIsAscending(false);

    } else {
      modifiedRecords.sort((a, b) => (a[sortKeyword] > b[sortKeyword] ? 1 : -1))
      setIsAscending(true);
    }
  }

  const showNewNotification = (visitor) => {
    Notifier.start(
      "A visitor has arrived!",
      visitor + " has just arrived",
      "www.google.com",
      "/SiouxLogo.png"
    );
  };

  const editRecord = (id) => {
    history.push(`/update-record/${id}`);
  };

      const renderStatus = (appointmentId,expectedAtValue, arrivedCheck, notifiedCheck, visitor) => {

            var expectedAtDateTime = new Date(expectedAtValue);
            var halfHourAfterExpected = moment(expectedAtDateTime).add(30, 'm').toDate();
            var dayAfterExpected = moment(expectedAtDateTime).add(1,'d').toDate();
            var dayBeforeExpected = moment(expectedAtDateTime).subtract(1,'d').toDate();

            // console.log("expectedAtDateTime " + expectedAtDateTime);
            // console.log("halfHourAfterExpected " + halfHourAfterExpected);
            // console.log("dayAfterExpected " + dayAfterExpected);
            // console.log("dayBeforeExpected " + dayBeforeExpected);

            if(currentDateTime <= dayBeforeExpected || dayAfterExpected <= currentDateTime){
                  return ( <Tooltip title="Not relevant" placement="left" arrow>
            <Brightness1 style={{ color: "#9e9e9e" }} />
            </Tooltip>);
            }
            else
            {
                  if(arrivedCheck === 1){
                        
                        if(notifiedCheck !== 1){
                        showNewNotification(visitor);
                        ProtoSeanService.setNotified(appointmentId);
                        }
            
                        return ( <Tooltip title="Arrived" placement="left" arrow>
                        <CheckCircleIcon style={{ color: "green" }} />
                        </Tooltip>);
                  } else if (arrivedCheck !== 1){

                        if(currentDateTime >= halfHourAfterExpected){
                              return ( <Tooltip title="Not relevant" placement="left" arrow>
                              <Brightness1 style={{ color: "#9e9e9e" }} />
                              </Tooltip>);
                        } else {

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
            }
      }

  const tableGenerate = (protoSean, index) => {
    if (modifiedRecords.length === index + 1) {
      return (
        <tr key={protoSean.id} ref={lastBookElementRef}>
          <td>
            {renderStatus(
              protoSean.id,
              protoSean.expectedAt,
              protoSean.arrived,
              protoSean.secretaryNotified,
              protoSean.visitor
            )}
          </td>
          <td>{protoSean.visitor}</td>
          <td>{protoSean.numberPlate}</td>
          <td>{protoSean.phnNumber}</td>
          <td>{protoSean.hostEmail}</td>
          <td>{protoSean.expectedAt}</td>
          <td className="action-column">
            <button
              style={{ width: "80px" }}
              onClick={() => editRecord(protoSean.id)}
              className="btn btn-info"
            >
              <EditTwoToneIcon
                style={{
                  color: "white",
                  width: "25px",
                  height: "25px",
                  marginRight: "2px",
                }}
              />
              Edit
            </button>

            <button
              style={{
                width: "100px",
                marginLeft: "10px",
              }}
              onClick={() => deleteRecord(protoSean.id)}
              className="btn btn-danger"
            >
              <DeleteTwoToneIcon
                style={{
                  color: "white",
                  width: "25px",
                  height: "25px",
                  marginRight: "2px",
                }}
              />
              Delete
            </button>

            {/* <button onClick = {()=> gotNewNotification(protoSean.visitor)}></button> */}
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={protoSean.id}>
          <td>
            {renderStatus(
              protoSean.id,
              protoSean.expectedAt,
              protoSean.arrived,
              protoSean.secretaryNotified,
              protoSean.visitor
            )}
          </td>
          <td>{protoSean.visitor}</td>
          <td>{protoSean.numberPlate}</td>
          <td>{protoSean.phnNumber}</td>
          <td>{protoSean.hostEmail}</td>
          <td>{protoSean.expectedAt}</td>
          <td className="action-column">
            <button
              style={{ width: "80px" }}
              onClick={() => editRecord(protoSean.id)}
              className="btn btn-info"
            >
              <EditTwoToneIcon
                style={{
                  color: "white",
                  width: "25px",
                  height: "25px",
                  marginRight: "2px",
                }}
              />
              Edit
            </button>

            <button
              style={{
                width: "100px",
                marginLeft: "10px",
              }}
              onClick={() => deleteRecord(protoSean.id)}
              className="btn btn-danger"
            >
              <DeleteTwoToneIcon
                style={{
                  color: "white",
                  width: "25px",
                  height: "25px",
                  marginRight: "2px",
                }}
              />
              Delete
            </button>
          </td>
        </tr>
      );
    }
  };


  return modifiedRecords.map((protoSean, index) =>
    tableGenerate(protoSean, index)
  );
}
