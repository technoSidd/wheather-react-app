import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import fmi from "fmi-api";
import { useNavigate } from "react-router-dom";

class Home extends React.Component {
  state = {
    municipalities: [{ fmisid: 0, name: "Please wait" }],
    imageUrl: "https://konte.pages.labranet.jamk.fi/vue-weather-app/img/weatherapplogo.36014a54.png",
  };

  async componentDidMount() {
    const municipalities = await fmi.getLocations();
    this.setState({ municipalities });
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className="conatiner mt-6">
          <h2 className="text-center">Search for a municipality</h2>
          <div className="row text-center">
            <div className="col-md-10 mx-auto">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.municipalities}
                onChange={this.naviagateToResult}
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Search for a municipality" />}
              />
            </div>
          </div>
        </div> */}
        <div className="main">
          <div className="main__wrap">
            <div className="container mt-5" style={{ maxWidth: 1372 }}>
              <div className="pb-5 card sheet theme-light elevation-2" style={{ backgroundColor: "#cecece", borderColor: "#cecece" }}>
                <div className="row text-center">
                  <div className="col col-12">
                    <img src={this.state.imageUrl}></img>
                  </div>
                  <div className="col">
                    <h1 className="display-2 font-weight-bold mb-3">Search for weather forecasts</h1>
                    <p className="subheading font-weight-regular">Select a town from the dropdown bellow.</p>
                  </div>
                </div>
                <div className="row">
                  <div className="px-12 col col-12"></div>
                </div>
                <div className="row text-center">
                  <div className="col-md-10 mx-auto">
                    <Autocomplete
                      style={{ background: "white", borderRadius: 8 }}
                      disablePortal
                      id="combo-box-demo"
                      options={this.state.municipalities}
                      onChange={this.naviagateToResult}
                      sx={{ width: "100%" }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Search for a municipality" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  naviagateToResult = (event, value) => {
    console.log("", event.target.value, value);
    this.props.navigate("/result/" + value.name.split(",")[0]);
  };
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Home {...props} navigate={navigate} />;
}

export default WithNavigate;
