import React from "react";

const ResultsPopup = ({
  popupDate,
  popupMembers,
  popupDisplay,
  popupHour,
  xPos,
  yPos
}) => {
  const style = { display: popupDisplay, left: xPos, top: yPos };
  let memberDisplay;

  memberDisplay = popupMembers.map((member, index) => {
    return (
      <div className="results-popup__member" key={index}>
        {member}
      </div>
    );
  });

  return (
    <div className="results-test" style={style}>
      <h4>Players signed up for this time slot:</h4>
      <h5>
        {popupDate}, {popupHour} {}
      </h5>
      <div className="results-popup__members-list">{memberDisplay} </div>
    </div>
  );
};

export default ResultsPopup;
