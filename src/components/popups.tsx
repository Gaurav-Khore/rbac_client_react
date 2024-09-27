// Popup.js
import React from 'react';
import '../css/popup.css'; // Assuming CSS is in a separate file

const Popup = (props: any) => {
  if (!props.showPopup) return null;

  return (
    <div className="popup">
      <div className="popup-content" style={{ position: 'relative' }}>
        <div style={{ position: "absolute", right: "0", top: "0", cursor: "pointer", paddingRight: "10px" }}>
          <p onClick={() => props.setShowPopup(false)} style={{ fontWeight: "bold" }}>X</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid black" }}>
          <h1>{props.title}</h1>
        </div>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
