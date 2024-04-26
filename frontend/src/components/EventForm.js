import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const submiting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={event ? event.description : ""}
          rows="5"
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={submiting}>
          Cancel
        </button>
        <button disabled={submiting}>
          {submiting ? "Submiting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export const eventSubmit = async ({ request, params }) => {
  const method = request.method;
  const formData = await request.formData();
  const eventData = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    url = "http://localhost:8080/events/" + params.eventId;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "New Event can't be added" }, { status: 500 });
  } else {
    return redirect("/events");
  }
};
