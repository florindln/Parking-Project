import React, { Component, useCallback, useState } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

import TextField from "@material-ui/core/TextField";
import SearchRecordsComponent from "./SearchRecordsComponent";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import { LineWeight } from "@material-ui/icons";

class ListRecordsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      visitor: "",
      numberPlate: "",
      phnNumber: "",
      expectedAt: "",
      hostEmail: "",
      arrived: "",
      currentDateTime: new Date(),
      isAscending: false,
      keyword: "",
      type: 1,
      hasMore: false,
      isRecord: false,
      selectedDate: "",
      hasWhatsApp: 0,
      originalRecords: [],
      sortKeyword: "",
      // currentPage: 1,
      // recordsPerPage: 10,
    };

    this.changeVisitorHandeler = this.changeVisitorHandeler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.changeHostEmailHandeler = this.changeHostEmailHandeler.bind(this);
    this.changeExpectedAtHandeler = this.changeExpectedAtHandeler.bind(this);
    this.changeRecordInputHandler = this.changeRecordInputHandler.bind(this);
    this.changeRecordSelectHandler = this.changeRecordSelectHandler.bind(this);
    this.changeHasWhatsAppHandler = this.changeHasWhatsAppHandler.bind(this);
    this.dateSelectorReceive = this.dateSelectorReceive.bind(this);
    this.saveRecords = this.saveRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.dateSelectorReceive = this.dateSelectorReceive.bind(this);
    //this.changeDateSelection = this.changeDateSelection.bind(this);
  }

  validateEmail(email) {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      console.log("good email");
      document.getElementById("emailError").innerHTML = "";
      this.setState({ hostEmail: email });
      return true;
    } else if (email === "") {
      console.log("bad email");
      document.getElementById("emailError").innerHTML = "Please input an email";
      document.getElementById("emailInput").focus();
      return false;
    } else {
      console.log("bad email");
      document.getElementById("emailError").innerHTML = "Email needs @ and .";
      document.getElementById("emailInput").focus();
      return false;
    }
  }

  validatePhoneNumber(number) {
    const pattern = /^\+?\d+$/;
    const result = pattern.test(number);
    if (result === true) {
      console.log("good phone");
      this.setState({ phnNumber: number });
      document.getElementById("phoneError").innerHTML = "";
      return true;
    } else if (number === "") {
      console.log("bad phone");
      document.getElementById("phoneError").innerHTML =
        "Please input a phone number";
      document.getElementById("phoneInput").focus();
      return false;
    } else {
      console.log("bad phone");
      document.getElementById("phoneError").innerHTML =
        "Phone number must be only numbers";
      document.getElementById("phoneInput").focus();
      return false;
    }
  }

  validateVisitor(visitor) {
    if (visitor === "") {
      document.getElementById("visitorError").innerHTML =
        "Please input a visitor";
      document.getElementById("visitorInput").focus();
      return false;
    } else {
      document.getElementById("visitorError").innerHTML = "";
      return true;
    }
  }

  validateExpectedDate(date) {
    if (date === "") {
      document.getElementById("expectedDateError").innerHTML =
        "Please choose expected arrival date";
      document.getElementById("expectedAtDateTime").focus();
      return false;
    } else {
      document.getElementById("expectedDateError").innerHTML = "";
      return true;
    }
  }

  validateLicensePlate(licensePlate) {
    if (licensePlate === "") {
      document.getElementById("licensePlateError").innerHTML =
        "Please input a license plate";
      document.getElementById("licensePlateInput").focus();
      return false;
    } else {
      document.getElementById("licensePlateError").innerHTML = "";
      return true;
    }
  }

  saveRecords = (e) => {
    e.preventDefault();

    console.log();
    if (!this.validateEmail(this.state.hostEmail)) return;
    if (!this.validatePhoneNumber(this.state.phnNumber)) return;
    if (!this.validateVisitor(this.state.visitor)) return;
    if (!this.validateLicensePlate(this.state.numberPlate)) return;
    if (!this.validateExpectedDate(this.state.expectedAt)) return;

    let protoSean = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
      hostEmail: this.state.hostEmail,
      expectedAt:
        this.state.expectedAt.split("T")[0] +
        " " +
        this.state.expectedAt.split("T")[1],
      hasWhatsApp: this.state.hasWhatsApp,
    };

    ProtoSeanService.addRecords(protoSean);
    this.setState({
      visitor: "",
      numberPlate: "",
      phnNumber: "",
      hostEmail: "",
      expectedAt: "",
      hasWhatsApp: 0,
    });
    window.location.reload(true);
  };

  changeVisitorHandeler = (event) => {
    this.setState({ visitor: event.target.value });
  };

  changeNumberPlateHandeler = (event) => {
    this.setState({ numberPlate: event.target.value });
  };

  changePhnNumberHandeler = (event) => {
    this.setState({ phnNumber: event.target.value });
  };

  changeHostEmailHandeler = (event) => {
    this.setState({ hostEmail: event.target.value });
  };

  changeExpectedAtHandeler = (event) => {
    this.setState({ expectedAt: event.target.value });
  };

  changeHasWhatsAppHandler = (event) => {
    if (event.target.checked) {
      this.setState({
        hasWhatsApp: 1,
      });
    } else {
      this.setState({
        hasWhatsApp: 0,
      });
    }
  };

  changeRecordInputHandler = (event) => {
    this.setState({ keyword: event.target.value }, () => {
      this.getAllRecords();
    });
  };

  changeRecordSelectHandler = (event) => {
    this.setState({ type: event.target.value }, () => {
      this.getAllRecords();
    });
  };

  dateSelectorReceive = (date) => {
    this.setState({ selectedDate: date }, () => {
      this.getAllRecords();
    });
  };

  //changeDateSelection = (event) => {
  //this.setState({ selectedDate: event.target.value }, () => {});
  //};

  componentDidMount() {
    console.log("mount")
    this.getAllRecords();

  }

  componentDidUpdate() {
    if(this.state.sortKeyword != "") {
      this.setState({ sortKeyword: ""});
    }

  }


  getAllRecords = () => {
    //if selectedDate is 0, else return selected date records, gotta add into API
    const { keyword, selectedDate } = this.state;
    this.setState({ isRecord: false });
    ProtoSeanService.getDaRecords().then((res) => { // all records
      this.setState({ originalRecords: res.data });
      console.log(res.data);
    });
    ProtoSeanService.getRecords(keyword, selectedDate).then((res) => { // Filtered records
      this.setState({ records: res.data });
      console.log(this.state.records);
      this.setState({ isRecord: true });
    });
  };

  addRecord() {
    this.props.history.push("/add-record");
  }

  sortBy(key) {
    console.log(this.state.isAscending);

    if (this.state.isAscending) {
      this.setState({
        records: this.state.records.sort((a, b) => (a[key] < b[key] ? 1 : -1)),
      });
      this.setState({
        isAscending: false,
      });
    } else {
      this.setState({
        records: this.state.records.sort((a, b) => (a[key] > b[key] ? 1 : -1)),
      });
      this.setState({
        isAscending: true,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="row list-row ">
          <div className="search-controls">
            <div className="search-control-1">
              <SearchRecordsComponent
                keyword={this.state.keyword}
                type={this.state.type}
                changeRecordInputHandler={this.changeRecordInputHandler}
                dateSelectorReceive={this.dateSelectorReceive}
              />
            </div>
            {/* <div className="search-control-2">
              <DateSelectorComponent passDate = {this.dateSelectorReceive}/>
            </div> */}
          </div>

          <div className="records-table list-item-1">
            <table className="table table-striped table-borderless ">
              <thead className="table-head">
                <tr>
                  <th> Status </th>
                  <th
                    onClick={() => {
                      // this.sortBy("visitor");
                      console.log("visiotr boi")
                      this.setState({sortKeyword: "visitor"})
                    }}
                  >
                    {" "}
                    Visitor{" "}
                  </th>
                  <th
                    onClick={() => {
                      // this.sortBy("numberPlate");
                      this.setState({sortKeyword: "numberPlate"})
                    }}
                  >
                    {" "}
                    License Plate{" "}
                  </th>
                  <th
                    onClick={() => {
                      // this.sortBy("phnNumber");
                      this.setState({sortKeyword: "phnNumber"})
                    }}
                  >
                    {" "}
                    Phone Number{" "}
                  </th>
                  <th
                    onClick={() => {
                      // this.sortBy("hostEmail");
                      this.setState({sortKeyword: "hostEmail"})
                    }}
                  >
                    Host Email{" "}
                  </th>
                  <th
                    onClick={() => {
                      this.setState({sortKeyword: "expectedAt"})
                      // this.sortBy("expectedAt");
                    }}
                  >
                    {" "}
                    Expected At{" "}
                  </th>
                  <th> Actions </th>
                </tr>
              </thead>

              <tbody>
                {this.state.isRecord && (
                  <InfiniteScrollComponent
                    records={this.state.records}
                    currentDateTime={this.state.currentDateTime}
                    originalRecords={this.state.originalRecords}
                    sortKeyword = {this.state.sortKeyword}
                  />
                )}
              </tbody>
            </table>
          </div>

          <div className="list-item-2">
            <h5
              style={{ margin: "0", fontWeight: "500" }}
              className="text-center"
            >
              New appointment
            </h5>
            <div className="row">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Visitor:</label>
                    <input
                      id="visitorInput"
                      name="visitor"
                      className="form-control textbox"
                      value={this.state.visitor}
                      onChange={this.changeVisitorHandeler}
                    />
                    <p id="visitorError" className="recordFormError"></p>
                  </div>

                  <div className="form-group">
                    <label>License Plate:</label>
                    <input
                      id="licensePlateInput"
                      name="License Plate"
                      className="form-control textbox"
                      value={this.state.numberPlate}
                      onChange={this.changeNumberPlateHandeler}
                    />
                    <p id="licensePlateError" className="recordFormError"></p>
                  </div>

                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      id="phoneInput"
                      type="phone"
                      name="phnNumber"
                      className="form-control textbox"
                      value={this.state.phnNumber}
                      onChange={this.changePhnNumberHandeler}
                    />
                    <p id="phoneError" className="recordFormError"></p>
                  </div>

                  <div className="form-group">
                    <label>Host Email:</label>
                    <input
                      id="emailInput"
                      type="email"
                      name="hostEmail"
                      className="form-control textbox"
                      value={this.state.hostEmail}
                      onChange={this.changeHostEmailHandeler}
                    />
                    <p id="emailError" className="recordFormError"></p>
                  </div>

                  <div className="form-group">
                    <label>Expected At:</label>
                    <TextField
                      id="expectedAtDateTime"
                      type="datetime-local"
                      value={this.state.expectedAt}
                      onChange={this.changeExpectedAtHandeler}
                      className={"form-control textbox"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <p id="expectedDateError" className="recordFormError"></p>
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="hasWhatsApp"
                      value={this.state.hasWhatsApp}
                      onChange={this.changeHasWhatsAppHandler}
                    />{" "}
                    Has WhatsApp?
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveRecords}
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListRecordsComponent;
