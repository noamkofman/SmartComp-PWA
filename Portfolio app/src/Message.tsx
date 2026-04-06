// where all the messages on the site will be written
import { TypeAnimation } from 'react-type-animation';
const Message = () => {
    
  return (
    <div style={{ textAlign: "center" }}>
      <TypeAnimation
        sequence={["Hi, I'm Noam!", 1000000]}
        wrapper="span"
        style={{ fontSize: "80px", display: "center", fontFamily: "Noto Sans" }}
        repeat={Infinity}
      />
    <div>Hi there, Im a Data Science student at De Anza College. Im <br /> planning on transferring to a UC and become a Software Engineer</div>
    <br />
    <div>Sunnyvale 📍</div>
    
    </div>

  );
};

export default Message;
