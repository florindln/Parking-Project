import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DateSelectorComponent from "./DateSelectorComponent";

class SearchRecordsComponent extends Component {
  render() {
    return (
      <div className="container record-search-wrapper list-item-1">
        <div className="row" style={{ alignItems: 'flex-end' }}>
          <TextField
            className="record-search-input"
            label="Search..."
            value={this.props.keyword}
            onInput={this.props.changeRecordInputHandler}
          />
          <DateSelectorComponent passDate = {this.props.dateSelectorReceive}/>
        </div>
      </div>
    );
  }
}

export default SearchRecordsComponent;
