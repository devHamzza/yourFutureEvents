import EventsList from "../components/EventsList";
import { json, useLoaderData } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const eventsLoader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(
    //   JSON.stringify({ message: "Could not fetch Events", status: 500 })
    // );
    throw json(
      { message: "Could not fetch Events", status: 500 },
      { status: 500 }
    );
  } else {
    return response;
  }
};
