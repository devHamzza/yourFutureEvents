import React from "react";
import PageContent from "./PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const Error = () => {
  const errorData = useRouteError();
  console.log(errorData);

  let title = "An Error Occured";
  let message = "Some thing went wrong";

  if (errorData.status === 500) {
    message = errorData.data.message;
  }

  if (errorData.status === 404) {
    message = "Page not Found";
    title = "Not Found";
  }
  return (
    <>
    <MainNavigation/>
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
  );
};

export default Error;
