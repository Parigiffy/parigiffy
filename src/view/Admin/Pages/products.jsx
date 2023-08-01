import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Components/Admin/Header/header";
import Products from "../../../Components/Admin/Products/Products";

// import { AuthContext } from "../../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

function Product() {
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
          <Products />
          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}

export default Product;
