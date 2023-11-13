import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Events, { eventsLoader } from "./pages/Events";
import EventDetail, { eventDetailsLoader } from "./pages/EventDetail";
import NewEvent, { newEventSubmit } from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import Home from "./pages/Home";
import EventsRoot from "./components/EventsRoot";
import Error from "./components/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            {
              path: "",
              element: <Events />,
              loader: eventsLoader,
            },
            {
              path: ":eventId",
              loader: eventDetailsLoader,
              id: "event-deatils",
              children: [
                {
                  index: true,
                  element: <EventDetail />,
                },
                {
                  path: "edit",
                  element: <EditEvent />,
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: newEventSubmit,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
