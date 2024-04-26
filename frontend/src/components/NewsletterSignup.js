import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  const { Form, state, data } = useFetcher();

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert("Signed Up successfully!");
    }
  }, [state, data]);

  return (
    <Form method="post" action="/newsletter" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign Up</button>
    </Form>
  );
}

export default NewsletterSignup;
