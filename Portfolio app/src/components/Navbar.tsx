import { useState } from "react";
import python from "./3840px-Python-logo-notext.svg-removebg-preview.png";
import cpp from "./1280px-ISO_C++_Logo.svg-removebg-preview.png";
import assist from "./betterasist.png";
import trade from "./trading.png";
import mma from "./betterfigght.png";
import me from "./stanford.jpg";

function Navbar() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);

  const panelStyle = {
    marginTop: "14px",
    padding: "16px 20px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    backgroundColor: "#1e293b",
    color: "#f8fafc",
    minWidth: "320px",
    textAlign: "center" as const,
  };
    const imgStyle = { width: "80px", height: "80px" };
    const portraitstyle = { width: "400px", height: "500px" };

    const projimgStyle = { width: "450px", height: "300px" };

  return (
    // education button
    <div style={{ fontFamily: "sans-serif", padding: "40px 0", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={() => {
            setVisible1(!visible1);
            setVisible2(false);
            setVisible3(false);
            setVisible4(false);
            setVisible5(false);
          }}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Education
        </button>
        {/* project button */}
        <button
          onClick={() => {
            setVisible2(!visible2);
            setVisible1(false);
            setVisible3(false);
            setVisible4(false);
            setVisible5(false);
          }}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Projects
        </button>
        {/* extracituclars button */}
       <button
          onClick={() => {
            setVisible5(!visible5);
            setVisible1(false);
            setVisible3(false);
            setVisible4(false);
            setVisible2(false);
          }}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          ExtraCirriculars
        </button>
        {/* skills button */}
        <button
          onClick={() => {
            setVisible4(!visible4);
            setVisible1(false);
            setVisible3(false);
            setVisible2(false);
            setVisible5(false);
          }}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Skills
        </button>
        {/* about me button */}
       <button
          onClick={() => {
            setVisible3(!visible3);
            setVisible1(false);
            setVisible2(false);
            setVisible4(false);
            setVisible5(false);
          }}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          About Me
        </button>
      </div>
      {visible1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginTop: "12px" }}>
          <img src={me} alt="me" style={portraitstyle} />
          <div style={panelStyle}>
            <h3 style={{ margin: "0 0 10px 0" }}>Education</h3>
            <p style={{ margin: 0 }}>
              Homestead High School (2021-2025)
              <br />
              De Anza / Santa Barbara City College (2025-Present)
            </p>

            <p style={{ margin: "10px 0 6px 0", fontWeight: 600 }}>Major:</p>
            <ul style={{ listStylePosition: "inside", paddingLeft: 0, lineHeight: 1.8 }}>
              <li>Data Science</li>
            </ul>

            <p style={{ margin: "10px 0 6px 0", fontWeight: 600 }}>GPA:</p>
            <ul style={{ listStylePosition: "inside", paddingLeft: 0, lineHeight: 1.8 }}>
              <li>4.0</li>
            </ul>

            <p style={{ margin: "10px 0 6px 0", fontWeight: 600 }}>Relevant Coursework:</p>
            <ul style={{ listStylePosition: "inside", paddingLeft: 0, lineHeight: 1.8 }}>
              <li>Beginner C++</li>
              <li>Intermediate C++</li>
              <li>Data Structures & Algorithms</li>
              <li>R Programming</li>
              <li>Calc 1, 2, 3</li>
            </ul>
          </div>
        </div>
      )}
    {/* project boxes */}
     {visible2 && (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={panelStyle}>
                <h2>Better Assist</h2>
            <p>An application made to make the transfer process
            <br/> easier for De Anza students by making a full 
            <br/> 2 year course plan to transfer to wichever 
            <br/> school the user wants. data is scraped from assist.org
            </p>
            <img src={assist} alt="assist" style = {projimgStyle} />

            </div>
            <div style={panelStyle}>
                <h2>Options Trader</h2>
                <p>Made a program to predict wether an option 
                <br/> was worth buying using the BSM model. 
                <br/>It was ran on 2024 & 2025 Spy options 
                <br/> datasets, and was correct 98% of the time.
                <br/> Predicted profit of $1,000+
                </p>
                <img src={trade} alt="trading img" style={projimgStyle} />
            </div>
            
        </div>
        
    // about me text
        )}
         {visible4 && (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={panelStyle}>
                <h2>Python</h2>
           
            
            <img src={python} alt="python" style = {imgStyle} />
            </div>
            <div style={panelStyle}>
                <h2>C++</h2>
                <img src = {cpp} alt= "C++" style = {imgStyle} />
            </div>
            <div style = {panelStyle}>
            <h2>Data Science</h2>
            </div>
        </div>
         )}

        {visible5 && (
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                    <div style={panelStyle}>
                        <h2>MMA</h2>
                        <p>I have been training BJJ and Kickboxing for 
                        <br/>3 years now and its a sport I love to do in my free time</p>
                
                    
                    </div>
                    <div style={panelStyle}>
                        <h2>Programming</h2>
                        <p>I love to code in my free time and work on my side projects</p>
                    </div>
                    <div style = {panelStyle}>
                    <h2>Robotics Club</h2>
                    <p>I am apart of the De Anza robotics club with my freinds </p>
                    </div>
                </div>
                )}

        {visible3 && (
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                <div style={panelStyle}>
                    <h2>About me</h2>
                <p>Hi my name is Noam Kofman, I currently reside in Suynnyvale California.
                <br/>I am a student at De Anza College. I currently plan to do my second year 
                <br />at Santa Barbra City College. I plan to transfer to UCLA or UCSB and 
                <br /> I love Programming and software engineering. Im very passionate about 
                <br /> programming with datasets and data analysis.
                </p>
            </div>
        </div>
        )}
        </div>
        
  );
}

export default Navbar;
