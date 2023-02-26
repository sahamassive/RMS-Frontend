import React, { Component, useEffect, useState } from "react";

function PageTitle() {
  const [title, setTitle] = useState();
  const currentPathname = window.location.pathname;
  const pathSegments = currentPathname.split("/");
  const page = pathSegments.pop();

  console.log(page);
  useEffect(() => {
    setTitle((document.title = `Rms | ${page}`)); // Update the title whenever the component mounts or updates
  }, []);
  return title ? title : null;
}

export default PageTitle;
