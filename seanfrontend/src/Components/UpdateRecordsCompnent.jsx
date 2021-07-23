import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";
import TextField from "@material-ui/core/TextField";

class UpdateRecordsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      visitor: "",
      numberPlate: "",
      phnNumber: "",
      hostEmail: "",
      expectedAt: "",
    };
    this.changeVisitorHandler = this.changeVisitorHandler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.changeHostEmailHandeler = this.changeHostEmailHandeler.bind(this);
    this.changeExpectedAtHandeler = this.changeExpectedAtHandeler.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
  }

  componentDidMount() {
    ProtoSeanService.getRecordById(this.state.id).then((res) => {
      let protoSean = res.data;
      this.setState({
        visitor: protoSean.visitor,
        numberPlate: protoSean.numberPlate,
        phnNumber: protoSean.phnNumber,
        hostEmail: protoSean.hostEmail,
        expectedAt: protoSean.expectedAt,
      });
    });
  }

  updateRecord = (e) => {
    e.preventDefault();
    let record = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
      hostEmail: this.state.hostEmail,
      expectedAt:
        this.state.expectedAt.split("T")[0] +
        " " +
        this.state.expectedAt.split("T")[1],
    };
    console.log("record =>" + JSON.stringify(record));

    ProtoSeanService.updateRecord(record, this.state.id).then((res) =>{
      this.props.history.push('/records')
    })
  };

  changeVisitorHandler = (event) => {
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

  cancel() {
    this.props.history.push("/records");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 ">
            <h2 className="text-center">Update appointment</h2>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Visitor:</label>
                  <input
                    name="visitor"
                    className="form-control"
                    value={this.state.visitor}
                    onChange={this.changeVisitorHandler}
                  />
                </div>

                <div className="form-group">
                  <label>License Plate:</label>
                  <input
                    name="License Plate"
                    className="form-control"
                    value={this.state.numberPlate}
                    onChange={this.changeNumberPlateHandeler}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    name="phnNumber"
                    className="form-control"
                    value={this.state.phnNumber}
                    onChange={this.changePhnNumberHandeler}
                  />
                </div>

                <div className="form-group">
                    <label>Host Email:</label>
                    <input type="email"
                      name="hostEmail"
                      className="form-control textbox"
                      value={this.state.hostEmail}
                      onChange={this.changeHostEmailHandeler}
                    />
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
                    {/* <input
                    name="expectedAt"
                    className="form-control textbox"
                    value={this.state.expectedAt}
                    onChange={this.changeExpectedAtHandeler}
                  /> */}
                  </div>

                <button
                  className="btn btn-success"
                  onClick={this.updateRecord}
                >
                  Save
                </button>

                <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateRecordsComponent;
