import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Events, { eventsLoader } from "./pages/Events";
import EventDetail, {
  eventDeleter,
  eventDetailsLoader,
} from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import Home from "./pages/Home";
import EventsRoot from "./components/EventsRoot";
import Error from "./components/Error";
import { eventSubmit } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

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
                  action: eventDeleter,
                },
                {
                  path: "edit",
                  element: <EditEvent />,
                  action: eventSubmit,
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: eventSubmit,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
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
