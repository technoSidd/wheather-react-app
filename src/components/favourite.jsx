import React, { Component, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NavLink as Link } from "react-router-dom";

const Favourite = () => {
  const [imageUrl] = useState("https://konte.pages.labranet.jamk.fi/vue-weather-app/img/weatherapplogo.36014a54.png");
  const [count, setCount] = useState(0);
  const [favorites, setFavourites] = useState(false);

  useEffect(async () => {
    setCount(100);
    // Update the document title using the browser API
    const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    setFavourites(favorites);
  }, count);

  function removeFavorite(fmisid) {
    const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    if (favorites.includes(fmisid)) {
      favorites.splice(favorites.indexOf(fmisid), 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavourites(favorites);
    }
  }

  function renderForCasts() {
    if (favorites) {
      return favorites.map((data) => (
        <React.Fragment key={data}>
          <div className="col-sm-4 col-md-3 col-12">
            <div className="card sheet theme--light elevation-4" style={{ backgroundColor: "#aeddff", borderColor: "#aeddff" }}>
              <div className="card__title"> {data} </div>
              <div className="card__subtitle"> Forecast </div>
              <div className="card__text">
                <div className="flex" style={{ display: "flex" }}>
                  <div className="col-lg-5 col-5" style={{ marginLeft: -17 }}>
                    <Button variant="contained" className="fav-h-icon" startIcon={<FavoriteBorderIcon />} onClick={() => removeFavorite(data)}>
                      Remove
                    </Button>
                  </div>
                  <div
                    className="col-lg-5 col-12"
                    style={{
                      marginLeft: 55,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <Link
                      className="nav-link active view-btn"
                      style={{
                        color: "black",
                        backgroundColor: "#efefef",
                        height: 37,
                        minWidth: 64,
                        paddingLeft: 16,
                        paddingRight: 15,
                        paddingTop: 8,
                        paddingLeft: 16,
                        paddingBottom: 16,
                        borderRadius: 5,
                        fontWeight: "500",
                        fontSize: 14,
                      }}
                      aria-current="page"
                      to={"/result/" + data}
                    >
                      View
                    </Link>
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
                <h1 className="display-2 font-weight-bold mb-3">Favorite locations</h1>
                <p className="subheading font-weight-regular">Select a town from the list bellow.</p>
              </div>
            </div>
            <div className="row">
              <div className="px-12 col col-12"></div>
            </div>
            <div className="row mx-3" style={{ marginTop: 28 }}>
              {renderForCasts()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
