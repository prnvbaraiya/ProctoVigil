import { Typography } from "@mui/material";
import React from "react";
import Typed from "typed.js";

const TypedEffect = ({ sentences, title }) => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
      strings: sentences,
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, [sentences]);

  return (
    <div className="wrap">
      <Typography variant="h1">{title}</Typography>

      <div className="type-wrap">
        <Typography variant="h5">
          <span style={{ whiteSpace: "pre" }} ref={el} />
        </Typography>
      </div>
    </div>
  );
};

export default TypedEffect;
