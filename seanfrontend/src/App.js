import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import AddRecordsComponent from "./Components/AddRecordsComponent";
import UpdateRecordsComponent from "./Components/UpdateRecordsCompnent";

// import BinderComponent from "./Components/BinderComponent";

import "bootstrap/dist/css/bootstrap.min.css";
// import Grid from "@material-ui/core/Grid";
import VisitHistoryComponent from "./Components/VisitHistoryComponent";
import HomeComponent from "./Components/HomeComponent";
import RecordComponent from "./Components/RecordComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="content-outer">
          <div className="content-inner">
            <Switch>
              <Route path="/" exact component={HomeComponent}></Route>
              <Route path="/records" exact component={RecordComponent}></Route>
              <Route path="/add-record" component={AddRecordsComponent}></Route>
              <Route
                path="/update-record/:id"
                component={UpdateRecordsComponent}
              ></Route>
              <Route
                path="/visit-history"
                component={VisitHistoryComponent}
              ></Route>
            </Switch>
          </div>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
