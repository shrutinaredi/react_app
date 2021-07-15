import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getEpisodes } from "../actions";
import "./Episodes.css";

const Episodes = (props) => {
  const dispatch = useDispatch();
  const Episodes = useSelector((state) => state.episode__state);
  React.useEffect(() => {
    dispatch(getEpisodes());
  }, []);
  console.log(Episodes);

  const ShowData = () => {
    if (!_.isEmpty(Episodes.data)) {
      console.log("jse cjesj");
      return (
        <div className="episodeswrapper">
          {Episodes.data.map((e) => {
            return (
              <div key={e.episode} className={"eachepisode"}>
                {/* <ul> */}
                <p>
                  <span className={"episodenumber"}>{e.episode}</span>
                </p>
                <p>Name: {e.name}</p>
                <p>Air-Date : {e.air_date}</p>
                <p>characters count: {e.characters.length} </p>
                {/* </ul> */}
              </div>
            );
          })}
        </div>
      );
    }
    if (Episodes.errorMsg !== "") {
      return <p>{Episodes.error}</p>;
    }
    if (Episodes.loading) {
      return <p>......loading......</p>;
    }
    return <p>cant get the data from api</p>;
  };

  return (
    <div>
      <button className="Home_btn" onClick={() => props.history.push("/home")}>
        {"<--"} Home
      </button>
      <div>{ShowData()}</div>;
    </div>
  );
};

export default Episodes;
