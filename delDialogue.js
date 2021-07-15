import React from "react";
import { useDispatch } from "react-redux";
import "./delDialogue.css";


export default function DelDialogue({
  show,
  title,
  description,
  setShow,
  name,
}) {
  const dispatch = useDispatch();

  if (!show) {
    return <></>;
  }

  const delhandler = (e) => {
    e.preventDefault();
    dispatch({ type: "charDeleted", payload: { id: name } });
    setShow(false);
  };
  return (
    <div className="overlay">
      <div className="dialog">
        <div className="dialog__content">
          <h2 className="dialog__title">{title}</h2>
          <span className="dialog__description">{description}</span>
        </div>
        <hr />
        <div className="dialog__footer">
          <button className="dialog__confirm" onClick={(e) => delhandler(e)}>
            Delete
          </button>
          <button className="dialog__confirm" onClick={() => setShow(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
