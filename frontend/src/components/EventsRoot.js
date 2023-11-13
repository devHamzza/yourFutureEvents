import React from "react";
import EventsNavigation from "./EventsNavigation";
import { Outlet } from "react-router-dom";

const EventsRoot = () => {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default EventsRoot;
