import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./../css/navbar.css";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import api from "./../config.service";

const Navbar = ({ numberOfProduct }) => {
  //begin api getAll
  const [Categories, setCategories] = useState([]);
  const retrieveCategories = async () => {
    const response = await api.get("/categories");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveCategories();
      if (allCategories) setCategories(allCategories);
    };
    getAllCategories();
  }, []);
  //end api getAll

  function loadNavbarByCateg(idCateg) {
    var categ;
    for (var i = 0; i < Categories.length; i++) {
      if (Categories[i].id == idCateg) {
        categ = Categories[i];
        break;
      }
    }

    if (categ != null) {
      return categ["child"].map((item, id) => {
        console.log("its inside");
        return (
          <div className="sous-categorie-bloc" key={id}>
            <Link
              to={"/" + categ.category + "/" + item.category}
              className="title-sous-categ"
            >
              {item.category}
            </Link>
            {item["child"].map((sous_categ, idCateg) => {
              <Link
                to={
                  "/" +
                  categ.category +
                  "/" +
                  item.category +
                  "/" +
                  sous_categ.category
                }
                key={idCateg}
              >
                {sous_categ.category}
              </Link>;
            })}
          </div>
        );
      });
    } else {
      return <div>Not found</div>;
    }
  }

  function hoverCateg(e) {
    const categs = document.querySelectorAll(".item-categ");
    for (const c of categs) {
      c.className = "item-categ";
    }
    e.target.className = "item-categ active";
    var sous_categ = "";
    const id = e.target.getAttribute("data-id");
    console.log("id: " + id);
    /*  
    if(id != null){
      var x = loadNavbarByCateg(id)
      console.log(typeof x);
      ReactDOM.render(loadNavbarByCateg(id),document.querySelector(".sous-categ"));
    }
   */
    for (var i = 0; i < Categories.length; i++) {
      if (Categories[i]["id"] == id) {
        for (var j = 0; j < Categories[i]["child"].length; j++) {
          sous_categ +=
            '<div class="sous-categorie-bloc"> <a href="/' +
            Categories[i]["child"][j]["category"].replaceAll(" ", "_") +
            '" class="title-sous-categ">' +
            Categories[i]["child"][j]["category"] +
            "</a>";
          for (var k = 0; k < Categories[i]["child"][j]["child"].length; k++) {
            sous_categ +=
              '<a href="/' +
              Categories[i]["child"][j]["child"][k]["category"].replaceAll(
                " ",
                "_"
              ) +
              '">' +
              Categories[i]["child"][j]["child"][k]["category"] +
              "</a>";
          }
          sous_categ += "</div>";
        }
        document.querySelector(".sous-categ").innerHTML = sous_categ;
        break;
      }
    }
  }

  function loadNavbar() {
    if (window.innerWidth > 991) {
      return (
        <div className="col-200">
          <div className="categorie">Categories</div>
          <div className="dropdown-categorie position-absolute shadow">
            <div className="row margin-left-0">
              <div className="col-200 height-450">
                <ul className="liste-categorie">
                  {Categories.map((item, key) => {
                    return (
                      <li
                        className="item-categ"
                        key={item.id}
                        data-id={item.id}
                        onMouseOver={hoverCateg}
                      >
                        <Link to={"/" + item.category.replaceAll(" ", "_")}>
                          {item.category}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-700">
                <div className="sous-categ"></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-200">
          <div className="categorie" onClick={openSideBar}>
            <AiOutlineMenu className="menuCatgorie" />
            <p>Categories</p>
          </div>
          <div className="side-bar-categorie">
            <AiOutlineClose onClick={closeSideBar} className="closeBtn" />
            <ul className="liste-categorie">
              {Categories.map((item, i) => {
                return (
                  <li key={i} data-id={item.id}>
                    <Link
                      onClick={closeSideBar}
                      to={"/" + item.category.replaceAll(" ", "_")}
                    >
                      <div className="bg-orange-categ">{item.category}</div>
                    </Link>

                    <ul>
                      {item["child"].map((sous_item, key) => {
                        return (
                          <li key={sous_item.id} data-id={sous_item.id}>
                            <Link
                              onClick={closeSideBar}
                              to={"/" + sous_item.category.replaceAll(" ", "_")}
                            >
                              <div className="bg-orange-categ">
                                {sous_item.category}
                              </div>
                            </Link>

                            <ul>
                              {sous_item["child"].map(
                                (sous_sous_categ, key) => {
                                  return (
                                    <li key={key}>
                                      <Link
                                        onClick={closeSideBar}
                                        to={
                                          "/" +
                                          sous_sous_categ.category.replaceAll(
                                            " ",
                                            "_"
                                          )
                                        }
                                      >
                                        {sous_sous_categ.category}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  }

  function openSideBar() {
    const sb = document.querySelector(".side-bar-categorie");
    sb.className = "side-bar-categorie shadow-lg open";
  }
  function closeSideBar() {
    const sb = document.querySelector(".side-bar-categorie");
    sb.className = "side-bar-categorie shadow-lg";
  }
  function IsLoggin() {
    if (localStorage.getItem("token") !== null) {
      return true;
      console.log(localStorage.getItem("token"));
    } else {
      return false;
    }
  }

  function logout() {
    api.post("Client/logout", { token: localStorage.getItem("token") });
    localStorage.clear();
    window.location.reload();
  }
  const [InputSearch, setInputSearch] = useState("");
  const SearchChangeHandler = (e) => {
    setInputSearch(e.target.value);
  };
  const history = useHistory();
  function searchNavbar(e) {
    e.preventDefault();
    history.push("/search?q=" + InputSearch);
  }
  return (
    <div className="header">
      <div className="ContactHeader"></div>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header className="site-navbar">
        <div className="container">
          <div className="row align-items-center position-relative">
            <div className="col-12 col-md-3 text-md-center">
              <div className="site-logo">
                <Link to="/" className="font-weight-bold">
                  <img src={logo} draggable="false" alt="logo" />
                </Link>
              </div>
            </div>

            <div className="col-md-9  text-right">
              <nav
                className="site-navigation text-right ml-auto d-none d-md-block"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav ml-auto ">
                  <li
                    className={
                      !["events", "about", "blogs", "contact"].includes(
                        window.location.pathname.split("/")[1]
                      )
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/" className="nav-link">
                      Marketplace
                    </Link>
                  </li>
                  <li
                    className={
                      window.location.pathname.split("/")[1] === "about"
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/about" className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li
                    className={
                      window.location.pathname.split("/")[1] === "contact"
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/contact" className="nav-link">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <nav className="marketplace-navbar">
        <div className="container">
          <div className="row position-relative margin-10p">
            {loadNavbar()}

            <div className="col-auto-search p-0">
              <div className="h-100">
                <button
                  className="navbar-toggler d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <form
                  className="form-group d-none d-lg-flex"
                  onSubmit={searchNavbar}
                >
                  <div className="search">
                    <input
                      className="search"
                      type="search"
                      placeholder="Cherchez un produit, une marque ou une catégorie"
                      aria-label="Search"
                      onChange={SearchChangeHandler}
                    />
                  </div>
                  <button className="search-button" type="submit">
                    <AiOutlineSearch className="searchIconBtn" />
                  </button>
                </form>
              </div>
            </div>
            {IsLoggin() ? (
              <div className="p-0 width-auto">
                <div className="userNav">
                  <span
                    type="button"
                    className="SpanUserNav"
                    id="dropdownClient"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt className="iconUser" />
                    <span className="username d-none d-sm-inline ">
                      {localStorage.getItem("user")}
                    </span>
                  </span>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownClient"
                  >
                    <li>
                      <Link
                        to={"/myaccount"}
                        className="dropdown-item "
                        type="button"
                      >
                        My account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/chat"}
                        className="dropdown-item "
                        type="button"
                      >
                        Messages
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
                |
                <Link
                  to="/panier"
                  type="button"
                  className="SpanUserNav text-white"
                >
                  <p className="d-inline position-relative">
                    <FaShoppingCart className="iconCart mx-2" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numberOfProduct}
                    </span>
                  </p>
                </Link>
              </div>
            ) : (
              <div className="col-230 userDetailsNavbar">
                <FaUserAlt className="iconUser" />
                <Link to="/login" className="navFromNavbar">
                  Sign In
                </Link>
                /
                <Link to="/register" className="navFromNavbar">
                  Sign Up
                </Link>
                <FaShoppingCart className="iconCart" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
