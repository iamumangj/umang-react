// import { Component } from "react";
// import {
//   GITHUB_USER_API,
//   GITHUB_USERNAME,
// } from "../../../../public/common/constants";
// import "../styles/User.css";

// class UserClass extends Component {
//   constructor(props) {
//     super(props); // Call the super constructor with props

//     // console.log(props);
//     // console.log("Child - UserClass constructor() Called");

//     // Initialize the state of the component
//     this.state = {
//       userInfo: {
//         name: "Bharat Kumar",
//         location: "Bihar, India",
//         avatar_url:
//           "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg",
//       },
//     };
//   }

//   async getUserInfo() {
//     try {
//       const response = await fetch(GITHUB_USER_API + GITHUB_USERNAME);
//       const json = await response.json();

//       // console.log(json);

//       this.setState({
//         userInfo: json,
//       });
//     } catch (error) {
//       console.error("Error while fetching user data: ", error);
//     }
//   }

//   componentDidMount() {
//     // console.log("Child - UserClass componentDidMount() Called");

//     // this.timer = setInterval(() => {
//     //   console.log("setInterval Called - Namaste React OP");
//     // }, 1000);

//     // API Calls (Fetch Data)
//     this.getUserInfo();
//   }

//   componentDidUpdate() {
//     // console.log("Child - UserClass componentDidUpdate() Called");
//   }

//   componentWillUnmount() {
//     // console.log("Child - UserClass componentWillUnmount() Called");
//     // clearInterval(this.timer);
//   }

//   render() {
//     // console.log("Child - UserClass render() Method Called");

//     const { name, location, avatar_url } = this.state.userInfo;

//     return (
//       <div className="profile-container">
//         <div className="left-profile">
//           <h1>About Me</h1>
//           <h2>Name: {name}</h2>
//           <h2>Location: {location}</h2>
//           <img className="profile-pic" src={avatar_url} alt="User Avatar" />
//         </div>

//         <div className="right-profile">
//           <h1>My Skills</h1>
//           <ul>
//             <li>HTML</li>
//             <li>CSS</li>
//             <li>JavaScript</li>
//             <li>React</li>
//             <li>Node</li>
//             <li>MongoDB</li>
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

// export default UserClass;

// /**
//  * --- Mounting Phase ---
//  * Constructor (Dummy Data)
//  * Render (Dummy Data)
//  *    <HTML (Dummy Data)>
//  * ComponentDidMount
//  *    <API Call>
//  *    <this.setState> -> State variable is updated
//  *
//  * --- Updating Phase ---
//  * Render(API Data)
//  *    <HTML (New API Data)>
//  * ComponentDidUpdate
//  *
//  */
