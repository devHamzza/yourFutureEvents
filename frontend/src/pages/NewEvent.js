import React from "react";
import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

const NewEvent = () => {
  return <EventForm />;
};

export default NewEvent;

export const newEventSubmit = async ({ request, params }) => {
  const formData = await request.formData();
  const eventData = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw json({ message: "New Event can't be added" }, { status: 500 });
  } else {
    return redirect('/events')
  }
};
