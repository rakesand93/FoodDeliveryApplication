import React from 'react'
import User from "./User";
import UserClass from "./UserClass"


const About = () => {
  return (
    <div>
      <div>About</div>
      <User name={"Rakesh Function()"} />
      <UserClass name ="Rakesh Class" location="Dehradun Class" />
      
    </div>
  );
}

export default About