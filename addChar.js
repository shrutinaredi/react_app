//import { rest, set } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addChar.css";
import DialogueBox from "./DialogueBox";
//import {useForm} from 'react-hook-form'
// import {getCharacterList} from "../actions/charListActions"

const Addchar = (props) => {
  const dispatch = useDispatch();
  const characterstate = useSelector((state) => state.char__state);

  let characterlist = Object.values(characterstate.data);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("Human");
  const [status, setStatus] = useState("Alive");
  const [episodeNum, setepisodeNum] = useState();

  const [nameError, setnameError] = useState("");
  const [photoError, setphotoError] = useState("");
  const [locError, setlocError] = useState("");

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Title");
  const [desc, setDesc] = useState("Description");

  var regex_name = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/

const submitHandler=(e)=>{
  e.preventDefault();
  if(name === "")
  {
    namevalidator();
    return;
  }

  if(url === ""){
    photovalidator();
    return;
  }

  if(location === ""){
    locvalidator();
    return;
  }
  for (let i = 0; i < characterlist.length; i++) {
    if (characterlist[i].name === name) {
      setTitle("Character Already Added");
      setDesc(`${name} is already present in characters`);
      setShow(true);
      return;
    }
  }
  dispatch({
    type: "charLoaded",
    payload: {
      id: characterlist.length + 1,
      name: name,
      status: status,
      species: species,
      gender: gender,
      origin: { name: location, url: "" },
      image: url,
      episode: { length: episodeNum },
    },
    Id: name,
  });
  setTitle("New Character Added");
  setDesc(`${name} is added to characters`);
  setShow(true);
}

  const namevalidator = () => {
    if(name === ""){
      setnameError("Name field should not be empty")
      return;
    }
    else if (!regex_name.test(name)) {
      setnameError("Name should contain min 6 , max 20 letters");
      return;
    }
    else 
      setnameError("");
  };

  const photovalidator = () => {
    if(url === ""){
      setphotoError("Photo is required")
      return;
    }
    else 
      setphotoError("");
  };

  
  const locvalidator = () => {
    if(location === ""){
      setlocError("Location is required")
      return;
    }
    else 
      setlocError("");
  };
  
  return (
    <div className="newcharwrapper">
      <button className="Home_btn" onClick={() => props.history.push("/home")}>
        {"<--"} Home
      </button>
      <form
        onSubmit={(e) => 
          submitHandler(e)}
      >
        <div className="eachlabel">
          <label>Name : </label>
          <div  className = "error-input">
          <input
            type="text"
            pattern="[a-zA-Z]+*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => namevalidator()}
            onFocus={() => setnameError("")}
          />
           {nameError !== "" ? (<span className="error-add">{nameError}</span> ) : (<></>)}
           </div>
        </div>
        
        
        <div className="eachlabel">
          <label>Photo url : </label>
          <div className = "error-input">
          <input
            type="input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => photovalidator()}
            onFocus={() => setphotoError("")}
          />
          {photoError !== "" ? (<span className="error-add">{photoError}</span> ) : (<></>)}
          </div>
        </div>

        <div className="eachlabel">
          <label>Gender : </label>
          <select onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="eachlabel">
          <label>Location : </label>
          <div  className = "error-input">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={() => locvalidator()}
            onFocus={() => setlocError("")}
          />
          <br/>
          {locError !== "" ? (<span className="error-add">{locError}</span> ) : (<></>)}
          </div>
        </div>

        

        <div className="eachlabel">
          <label>Species : </label>
          <select onChange={(e) => setSpecies(e.target.value)}>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="eachlabel">
          <label>Status : </label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="eachlabel">
          <label>Number of episodes character involved : </label>
          <input
            type="number"
            value={episodeNum}
            onChange={(e) => setepisodeNum(e.target.value)}
          />
        </div>

        <div className={"addcharbutton"}>
          <button className="submit-btn" type="submit" disabled={(nameError !== "" || photoError !== "" || locError !== "")?true:false}>Add Character</button>
        </div>
      </form>

      <DialogueBox
        show={show}
        title={title}
        description={desc}
        setShow={setShow}
      ></DialogueBox>
    </div>
  );
};

export default Addchar;
