import { Breadcrumbs, Link } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

function BreadcrumbsItem() {
  const location = useLocation();
  const items = location.pathname.split("/").splice(2);
  let url = "/teacher";
  return (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      {items.map((item, index) => {
        url += "/" + item;
        return (
          <Link underline="hover" color="inherit" href={url} key={index}>
            {item}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsItem;
