import React from "react";
import Slider from "./slider/Slider";
import StudySession from "./studey session section/StudySession";

const Home = () => {
  return (
    <div className="space-y-10">
      <Slider></Slider>
      <StudySession></StudySession>
    </div>
  );
};

export default Home;
