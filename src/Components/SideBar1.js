import React, { useState, useEffect } from "react";
import "./SideBar1.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMenuAlt1 } from "react-icons/hi";
import axios from "axios";
import { url } from "./url";

// import { Scrollbars } from "react-custom-scrollbars";

const SideBar1 = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState(false);
  const [departments, setDepartments] = useState(false);
  const [products, setProducts] = useState(false);

  const get_departments = async () => {
    // let url = "https://127.0.0.1:5000/api/departments";
    const { data } = await axios.post(`${url}/api/departments`);
    setDepartments(data);
    localStorage.setItem("totalCategory", JSON.stringify(data));
    console.log(data);
  };

  const get_products = async () => {
    // let url = "http://localhost:5000/api/products";
    const { data } = await axios.get(`${url}/api/products`);
    setProducts(data);
  };

  const activate_sidebar = () => {
    setSidebar(true);
  };

  const deactivate_sidebar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    get_departments();
    get_products();
  }, []);

  return (
    <div className='departmentRowHomeHeader'>
      <div className='departmentRowHomeHeaderContainer'>
        {" "}
        <div className='d-md-none'>
          <HiMenuAlt1 className='navbarToggleIcon' onClick={activate_sidebar} />
          Category
        </div>
        {sidebar && (
          <section
            className='sidebarSection'
            onClick={(e) => {
              deactivate_sidebar();
            }}
          >
            <div className='sidebarContainer'>
              <div className='sidebarBody'>
                {/* <Scrollbars style={{ width: "365px", height: "600px" }}> */}
                <div className='sidebarBodyContainer'>
                  {departments && (
                    <div className='sidebarTrendingSection'>
                      <p className='sidebarBodyTitle text-danger'>categories</p>
                      {departments.map((department) => (
                        <div
                          key={department._id}
                          className='sidebarBodyTextDiv'
                          onClick={(e) => {
                            e.preventDefault();
                            deactivate_sidebar();
                          }}
                        >
                          <p
                            className='sidebarBodyText ps-3 pb-2 border-bottom'
                            onClick={(e) => {
                              // e.preventDefault();
                              // navigate(`/product/${department._id}`);
                              navigate(`/category/${department._id}`);
                              deactivate_sidebar();
                              window.location.reload()
                            }}
                          >
                            {department.name}
                          </p>
                        </div>
                      ))}
                      <hr />
                    </div>
                  )}
                </div>
                {/* </Scrollbars> */}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SideBar1;
