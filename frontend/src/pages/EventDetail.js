import React from "react";
import EventItem from "../components/EventItem";
import {
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";

const EventDetail = () => {
  const data = useRouteLoaderData("event-deatils");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetail;

export const eventDetailsLoader = async ({ request, params }) => {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId
  );

  if (!response.ok) {
    throw json(
      { message: "Can't fetch selected event details." },
      { status: 500 }
    );
  } else {
    return response;
  }
};

export const eventDeleter = async ({ request, params }) => {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    { method: request.method }
  );

  if (!response.ok) {
    throw json({ message: "Can't Delete the event." }, { status: 500 });
  } else {
    return redirect("/events");
  }
};
