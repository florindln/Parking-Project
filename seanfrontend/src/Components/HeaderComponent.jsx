import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogoutButtonComponent from "../Components/LogoutButtonComponent";
import LoginButtonComponent from "../Components/LoginButtonComponent";




class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <header>
          <nav className="navbar">
            <div>
              <Link to='/records'>
                <img src="SiouxLogo.png" alt="" className="header-image"/>
              </Link>
            </div>
            <ul className="links-list">
                
                <li>
                  <Link to='/'>
                    Home
                  </Link>
                </li>

                <li>
                  <Link to='/records'>
                    Appointments
                  </Link>
                </li>

                {/* <li>
                  <Link to='/add-record'>
                    AddRecord
                  </Link>
                </li> */}

                {/* <li>
                  <Link to='/visit-history'>
                    VisitHistory
                  </Link>
                </li> */}

                <li>
                  <LoginButtonComponent/>
                </li>

                <li>
                  <LogoutButtonComponent/>
                </li>

              </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
