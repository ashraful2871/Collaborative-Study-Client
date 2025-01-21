import React from "react";
import Slider from "./slider/Slider";
import StudySession from "./studey session section/StudySession";
import AllTutor from "./tutor/AllTutor";

const Home = () => {
  return (
    <div className="space-y-12">
      <Slider></Slider>
      <StudySession></StudySession>
      <AllTutor></AllTutor>
    </div>
  );
};

export default Home;
