import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Admin/Header/header";
import Department from "../../../Components/Admin/Departments/Departments";

function Departments() {
  const navigate = useNavigate();
  const [userErr, setUserErr] = useState(false);

  // const AdminSignIn = () => {
  //   const { user } = useContext(AuthContext);
  //   if (user) {
  //     localStorage.setItem("adminInfo", JSON.stringify(user));
  //   }
  // };

  // AdminSignIn();

  // useEffect(() => {
  //   const user = localStorage.getItem("adminInfo");
  //   if (!user) {
  //     navigate("/admin/login");
  //   } else if (user) {
  //     setUserErr(false);
  //   }
  // }, [navigate]);

  return (
    <div>
      {userErr ? (
        <p>loading</p>
      ) : (
        <div>
          <Header />
          <Department />
          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}

export default Departments;
