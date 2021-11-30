import React, { Component, useState, useEffect } from "react";
import css from "../scss/result.scss";
import fmi from "fmi-api";
import queryString from "query-string";
import { withRouter, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import Moment from "react-moment";
import Moment from "moment";

const Result = () => {
  const [imageUrl] = useState("https://konte.pages.labranet.jamk.fi/vue-weather-app/img/weatherapplogo.36014a54.png");
  const { id } = useParams();
  var [observation, setObservation] = useState("");
  var [forecast, setForcast] = useState([]);
  const [count, setCount] = useState(0);
  const [isThisFavourite, setFavourite] = useState(false);

  useEffect(async () => {
    setCount(100);
    // Update the document title using the browser API
    observation = await fmi.getLatestObservation(id);
    setObservation(observation);
    forecast = await TimestampedForecast(await fmi.getForecast(id));
    setForcast(forecast);
    console.log(forecast);
    const favorites = localStorage.favorites !== undefined ? JSON.parse(localStorage.favorites) : [];
    if (favorites.length > 0 && favorites.includes(id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, count);

  function TimestampedForecast(forecast) {
    const out = {};
    for (const topic in forecast) {
      // Every weather topic inside the forecast
      const topicData = forecast[topic];
      for (const measurement of topicData) {
        // Every measurement inside a topic
        out[measurement.time] = out[measurement.time]
          ? { ...out[measurement.time], [topic]: measurement.value } // If the child does not have a time as a key, set it and set the value for the key
          : { [topic]: measurement.value }; // If the child has time as a key, just set the value for it
      }
    }
    return out;
  }
  function formatDate(dateStr) {
    // return format(new Date(dateStr), "EEEE dd.MM.yyyy HH:mm");
    return Moment(dateStr).format("dddd.MM.yyyy HH:mm");
  }
  function addFavorite(id) {
    const favorites = localStorage.favorites !== undefined ? JSON.parse(localStorage.favorites) : [];
    if (favorites.length > 0 && favorites.includes(id)) {
      let index = favorites.indexOf(id);
      favorites.splice(index, 1);
      localStorage.favorites = JSON.stringify(favorites);
      setFavourite(false);
    } else {
      setFavourite(true);
      favorites.push(id);
      localStorage.favorites = JSON.stringify(favorites);
    }
  }
  function renderForCasts() {
    if (forecast) {
      return Object.keys(forecast).map((data) => (
        <React.Fragment key={data}>
          <div className="col-sm-4 col-md-3 col-12" style={{ paddingBottom: 32 }}>
            <div className="card sheet theme--light elevation-4" style={{ backgroundColor: "#fff", borderColor: "#fff" }}>
              <div className="card__title"> {formatDate(data)} </div>
              <div className="card__subtitle"> Forecast </div>
              <div className="card__text">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="list-item list-item--two-line theme--light">
                      <div className="list-item__content">
                        <div className="list-item__title">Temperature</div>
                        <div className="list-item__subtitle">{forecast[data].Temperature} °C</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="list-item list-item--two-line theme--light">
                      <div className="list-item__content">
                        <div className="list-item__title">Humidity</div>
                        <div className="list-item__subtitle">{forecast[data].Humidity} %</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="list-item list-item--two-line theme--light">
                      <div className="list-item__content">
                        <div className="list-item__title">Pressure</div>
                        <div className="list-item__subtitle">{forecast[data].Pressure} hPa</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="list-item list-item--two-line theme--light">
                      <div className="list-item__content">
                        <div className="list-item__title">Dewpoint</div>
                        <div className="list-item__subtitle">{forecast[data].DewPoint} °C</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="list-item list-item--two-line theme--light">
                      <div className="list-item__content">
                        <div className="list-item__title">Wind</div>
                        <div className="list-item__subtitle">{forecast[data].WindSpeedMS} m/s</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="list-item list-item--two-line theme--light">
                      <div className="list-item__content">
                        <div className="list-item__title">Wind gusts</div>
                        <div className="list-item__subtitle">{forecast[data].WindGust} m/s</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ));
    } else {
      console.log("not ok");
      return <div>Please wait..!</div>;
    }
  }

  return (
    <div className="main">
      <div className="main__wrap">
        <div className="container mt-5" style={{ maxWidth: 1372 }}>
          <div className="pb-5 card sheet theme-light elevation-2" style={{ backgroundColor: "#cecece", borderColor: "#cecece" }}>
            <div className="row text-center">
              <div className="col col-12">
                <img src={imageUrl}></img>
              </div>
              <div className="col">
                <h1 className="display-2 font-weight-bold mb-3">{id}</h1>
                <p className="subheading font-weight-regular"></p>
                {isThisFavourite ? (
                  <Button variant="contained" className="fav-h-icon" startIcon={<FavoriteIcon />} onClick={() => addFavorite(id)}>
                    Remove favorite
                  </Button>
                ) : (
                  <Button variant="contained" className="fav-h-icon" startIcon={<FavoriteBorderIcon />} onClick={() => addFavorite(id)}>
                    Add as favorite
                  </Button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="px-12 col col-12"></div>
            </div>
            <div className="row mx-5">
              {observation ? (
                <div className="col-sm-4 col-md-3 col-12" style={{ paddingBottom: 32 }}>
                  <div className="card sheet theme--light elevation-4" style={{ backgroundColor: "#aeddff", borderColor: "#aeddff" }}>
                    <div className="card__title"> Weather right now </div>
                    <div className="card__subtitle"> Observation </div>
                    <div className="card__text">
                      <div className="row">
                        <div className="col-lg-6 col-12">
                          <div className="list-item list-item--two-line theme--light">
                            <div className="list-item__content">
                              <div className="list-item__title">Temperature</div>
                              <div className="list-item__subtitle">{observation.t2m} °C</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="list-item list-item--two-line theme--light">
                            <div className="list-item__content">
                              <div className="list-item__title">Humidity</div>
                              <div className="list-item__subtitle">{observation.rh} %</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="list-item list-item--two-line theme--light">
                            <div className="list-item__content">
                              <div className="list-item__title">Pressure</div>
                              <div className="list-item__subtitle">{observation.p_sea} hPa</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="list-item list-item--two-line theme--light">
                            <div className="list-item__content">
                              <div className="list-item__title">Dewpoint</div>
                              <div className="list-item__subtitle">{observation.wd_10min} °C</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="list-item list-item--two-line theme--light">
                            <div className="list-item__content">
                              <div className="list-item__title">Wind</div>
                              <div className="list-item__subtitle">{observation.wd_10min} m/s</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="list-item list-item--two-line theme--light">
                            <div className="list-item__content">
                              <div className="list-item__title">Wind gusts</div>
                              <div className="list-item__subtitle">{observation.wg_10min} m/s</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Please wait..!</div>
              )}
              {renderForCasts()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
