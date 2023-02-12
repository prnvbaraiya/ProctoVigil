import React from "react";
import Draggable from "react-draggable";

function DraggableLocalStream() {
  return (
    <>
      <Draggable bounds="parent">
        <div
          id="local-stream"
          style={{
            width: "250px",
            height: "170px",
            border: "2px solid black",
          }}
        ></div>
      </Draggable>
    </>
  );
}

export default DraggableLocalStream;
