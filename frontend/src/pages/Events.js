import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { defer, json, useLoaderData, Await } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;

const loadEvents = async () => {
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
    const resData = await response.json();
    return resData.events;
  }
};

export const eventsLoader = () => {
  return defer({
    events: loadEvents(),
  });
};
