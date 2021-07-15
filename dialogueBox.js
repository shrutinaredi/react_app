import "./DialogueBox.css";

import React from "react";

export default function DialogueBox({ show, title, description,setShow }) {
  if (!show) {
    return <></>;
  }
  return (
    <div className="overlay">
      <div className="dialog">
        <div className="dialog__content">
          <h2 className="dialog__title">{title}</h2>
          <p className="dialog__description">{description}</p>
        </div>
        <hr />
        <div className="dialog__footer">
          <button className="dialog__confirm" onClick={()=>setShow(false)}>Continue</button>
        </div>
      </div>
    </div>
  );
}
