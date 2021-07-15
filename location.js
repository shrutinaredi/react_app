import React from "react";
import "./location.css";
import { getLocation } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

function Location(props) {
  const loc_link = props.loc_link;
  const dispatch = useDispatch();
  const locstate = useSelector((state) => state.location__state);
  React.useEffect(() => {
    dispatch(getLocation(loc_link));
  }, []);

  const ShowData = () => {
    if (locstate.loading) {
      return <p>.....loading.....</p>;
    }

    if (!_.isEmpty(locstate.data[loc_link])) {
      return (
        <div className={"results"}>
          <span className="label">location name - </span>
          <span className="result">{locstate.data[loc_link].name}</span>
          <br></br>
          <span className="label">location type - </span>
          <span className="result">{locstate.data[loc_link].type}</span>
          <br></br>
          <span className="label">location dimension - </span>{" "}
          <span className="result">{locstate.data[loc_link].dimension}</span>
          <br></br>
          <span className="label">no of residents - </span>
          <span className="result">
            {locstate.data[loc_link].residents.length}
          </span>
        </div>
      );
    }
    if (locstate.errorMsg !== "") {
      return <p>{locstate.errorMsg}</p>;
    }

    return <p>error getting charecter </p>;
  };
  console.log(props);
  return props.trigger ? (
    <div className={"popup"}>
      <div className={"popup-inner"}>
        {ShowData(loc_link)}

        <button className={"close_btn"} onClick={() => props.setTrigger(false)}>
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Location;
