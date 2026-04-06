import React from "react";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onEnterName: () => void;
};

export default function UserName({ text, setText, onEnterName }: Props) {
  return (
    <div>
      <label htmlFor="name-input">Name: </label>
      <input
    
        id="name-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter athlete name"
      />


      <style>{`
        .button {
          border: none;
          color: white;
          background: #727880ff;
          padding: 4px 23px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 12px;
          margin: 4px 5px;
          cursor: pointer;
          transition-duration: 0.4s;
          border-radius: px;
        }
        .button1:hover {
          box-shadow: 0 4px 6px 0 rgba(235, 222, 222, 0.6);
        }
      `}</style>

      {/* <button type="button" onClick={onEnterName} className="button button1">
        Enter Name
      </button> */}
      <button
      type="button"
      onClick={onEnterName}
      className="button button1"
      style={{ backgroundColor: "gray", color: "white" }}>
      Enter Name
    </button>

    </div>
  );
}
