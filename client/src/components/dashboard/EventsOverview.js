import React from "react";
import { Link } from "react-router-dom";

const EventsOverview = ({ events, groupid }) => {
  console.log(this.props);
  const eventsDisplay = events.map(event => {
    return (
      <Link key={event._id} to={`/dashboard/${groupid}/${event._id}`}>
        <div className="event-display__container">
          <h5 className="event-display__link">{event.name}</h5>
          <div className="event-display__content">
            <p className="standard-text">
              Players Requested:{" "}
              {event.eventSize === 0 ? "unlimited" : event.eventSize}
            </p>
            <div className="event-display__description">
              {event.description}
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="event-display">
      <h4>Events available for Signup</h4>
      {eventsDisplay}
    </div>
  );
};

export default EventsOverview;
