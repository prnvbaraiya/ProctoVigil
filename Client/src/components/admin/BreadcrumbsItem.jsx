import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import auth from "../../auth/auth";

function BreadcrumbsItem() {
  const location = useLocation();
  const items = location.pathname.split("/").splice(2);
  let url = "/" + auth.roles;
  return (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" to={url + "/dashboard"}>
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
