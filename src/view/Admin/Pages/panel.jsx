import React, { useContext, useEffect, useState } from "react";
import AdminPanel from "../../../Components/Admin/Panel/panel";

import Header from "../../../Components/Admin/Header/header";
import Dash from "../../../Components/Admin/Panel/Dash";
import OrderActivity from "../../../Components/Admin/Panel/OrderActivity";
import Progress from "../../../Components/Admin/Panel/Progress";
// import { AuthContext } from "../../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

function Panel() {
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
          <AdminPanel />
          <OrderActivity />
          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}

export default Panel;
