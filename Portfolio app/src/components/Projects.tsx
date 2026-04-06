import React from "react";

function Projects() {
  const boxStyle = {
    width: "550px",
    padding: "100px",
    border: "1px solid #060606",
    boxShadow: "0 0 0 #0a0909",
    margin: "10px",
    backgroundColor: "#776d6d",
    borderRadius: "15px",
  };

  return (
    <div>
      <div
        style={{
          minHeight: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      </div>

      <h1 style={{ textAlign: "center" }}>Projects</h1>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={boxStyle}>
          <h2>Project 1</h2>
          <p>Content goes here.</p>
        </div>
        <div style={boxStyle}>
          <h2>Project 2</h2>
          <p>Content goes here.</p>
        </div>
        <div style={boxStyle}>
          <h2>Project 3</h2>
          <p>Content goes here.</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
