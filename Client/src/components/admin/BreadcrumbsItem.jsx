import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function BreadcrumbsItem() {
  const location = useLocation();
  const items = location.pathname.split("/").splice(2);
  let url = "/admin";
  return (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" to="/">
        Home
      </Link>
      {items.map((item, index) => {
        url += "/" + item;
        return (
          <Link underline="hover" color="inherit" to={url} key={index}>
            {item}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsItem;
