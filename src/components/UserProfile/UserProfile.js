import { useEffect, useState } from "react";
import { GITHUB_USER_API, GITHUB_USERNAME } from "../../utils/constants";
import "./UserProfile.scss";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  async function getUserInfo() {
    try {
      const response = await fetch(GITHUB_USER_API + GITHUB_USERNAME);
      const json = await response.json();

      // console.log(json);
      setUserInfo(json);
    } catch (error) {
      console.error("Error while fetching user data: ", error);
    }
  }

  useEffect(() => {
    console.log("Profile Component Mounted");
    // API Calls (Fetch Data)
    getUserInfo();

    // const timer = setInterval(() => {
    //   console.log("setInterval Called - Namaste React OP");
    // }, 1000);

    // return () => {
    // console.log("Profile Component Unmounted");
    //   clearInterval(timer);
    // };
  }, []);

  // console.log("render")
  return (
    <div className="profile-container">
      <div className="left-profile">
        <h1>About Me</h1>
        <h2>Name: {userInfo.name}</h2>
        <h2>Location: {userInfo.location}</h2>
        <img
          className="profile-pic"
          src={userInfo.avatar_url}
          alt="User Avatar"
        />
      </div>

      <div className="right-profile">
        <h1>My Skills</h1>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node</li>
          <li>MongoDB</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
