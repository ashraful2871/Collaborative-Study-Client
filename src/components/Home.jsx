import React from "react";
import Slider from "./slider/Slider";
import StudySession from "./studey session section/StudySession";
import AllTutor from "./tutor/AllTutor";
import PopularTutor from "./tutor/PopularTutor";
import RecentJoinTutor from "./tutor/RecentJoinTutor";

const Home = () => {
  return (
    <div className="space-y-12 mb-12">
      <Slider></Slider>
      <StudySession></StudySession>
      <PopularTutor></PopularTutor>
      <RecentJoinTutor></RecentJoinTutor>
      <AllTutor></AllTutor>
    </div>
  );
};

export default Home;
