import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useState } from "react";
import "./CharacterPage.css";
import Location from "./location";

const CharacterPage = (props) => {
  const charname = props.match.params.name;
  const [buttonPopup, setbuttonPopup] = useState(false);
  const charstate = useSelector((state) => state.char__state);
  const char_data = charstate.data[charname];

  const ShowData = () => {
    if (_.isEmpty(char_data)) {
      return <span className="nochar">Character not available</span>;
    }

    return (
      <div className="divisions">
        <div className="left">
          <div className="first">
            <div className="Gender">
              <span className="label">Gender : </span>{" "}
              <span className="result">{char_data.gender}</span>
            </div>
            <div className="Species">
              <span className="label">Species : </span>{" "}
              <span className="result">{char_data.species}</span>
            </div>
            <div className="Status">
              <span className="label">Status : </span>{" "}
              <span className="result">{char_data.status}</span>
            </div>
            <div className="Location">
              <span className="label">Location : </span>{" "}
              {/* <span className="result">{char_data.origin.name}</span> */}
              <button
                className="result"
                onClick={() => setbuttonPopup(!buttonPopup)}
              >
                {char_data.origin.name}
              </button>
            </div>
            <Location
              trigger={buttonPopup}
              setTrigger={setbuttonPopup}
              loc_link={char_data.origin.url}
            ></Location>
          </div>
          <div className="second">
            <div className="Noofepi">
              <span className="label">
                Number of episodes in which charecter appeared :{" "}
              </span>{" "}
              <span className="result">{char_data.episode.length}</span>
            </div>
          </div>
        </div>
        <div className="right">
          <img src= {char_data.image } widht ="300" height="300" alt=""></img>
        </div>
      </div>
    );
  };

  return (
    <div className={"characterpage"}>
      <button className="Home_btn" onClick={() => props.history.push("/home")}>
        {"<--"} Home
      </button>
      <span className="Name">{char_data.name}</span>

      {ShowData()}
    </div>
  );
};

export default CharacterPage;
