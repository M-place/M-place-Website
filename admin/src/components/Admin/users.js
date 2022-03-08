import { Link } from "react-router-dom";
//import ReactEditor from "./../reactEditor.js";
import React, { useState, useEffect } from "react";
import { BiTrashAlt, BiPlayCircle } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import api from "./../../config.service";

const Users = () => {
  //errer validation password
  const [errorValidationPassword, seterrorValidationPassword] = useState("");
  //password input
  const [password, setPassword] = useState("");
  //begin api getAll
  const [users, setUsers] = useState([]);
  const [userConsult, setUserConsult] = useState({});
  const retrieveUsers = async () => {
    const response = await api.get("/random_user?size=20");
    return response.data;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };
    getAllUsers();
  }, []);
  //end api getAll

  // function find user
  function findUser(id) {
    setUserConsult(users.find((user) => user.id === id));
    ConsultShow();
  }

  //function verification password
  const verificationPassword = async () => {
    if (password.length === 0) {
      seterrorValidationPassword("Enter your Password");
      console.log(password);
    } else if (password.length < 8) {
      seterrorValidationPassword("Password should be at list 8 caractere");
      console.log(password);
    } else {
      await api
        .get("/verififcationPassword", { password: password })
        .then((response) => {
          if (response.status === 200) {
            api
              .post("/deleteUser/" + idDelete)
              .then((response) => {
                PasswordValidClose();
                const newusersList = users.filter((user) => {
                  return user.id !== idDelete;
                });

                setUsers(newusersList);
              })
              .catch((err) => {
                seterrorValidationPassword("Incorrect Password");
                console.log(err);
              });
          } else if (response.status === 204) {
          }
        })
        .catch((err) => {
          seterrorValidationPassword("erreru");
          console.log(password);
          console.log(err);
        });
    }
  };
  function getPassword(val) {
    seterrorValidationPassword("");
    setPassword(val.target.value);
  }

  const [show, setModifyShow] = useState(false);
  const ConsultClose = () => setModifyShow(false);
  const ConsultShow = () => setModifyShow(true);

  const [showPasswordValid, setPasswordValidShow] = useState(false);
  const PasswordValidClose = () => setPasswordValidShow(false);
  const PasswordValidShow = () => setPasswordValidShow(true);

  const [showDelete, setDeleteShow] = useState(false);
  const DeleteClose = () => setDeleteShow(false);
  const [idDelete, setIdDelete] = useState(0);
  const DeleteShow = (id) => {
    setDeleteShow(true);
    setIdDelete(id);
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Users
          </li>
        </ol>
      </nav>

      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of users</h1>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <th>
                <div className="data picture"></div>
              </th>
              <th>
                <div className="data">Full name</div>
              </th>
              <th>
                <div className="data">Phone</div>
              </th>
              <th>
                <div className="data">Creation date</div>
              </th>
              <th>
                <div className="data">Actions</div>
              </th>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="data picture">
                        <img src={item.avatar} alt="" />
                      </div>
                    </td>
                    <td>
                      <div className="data">
                        {item.first_name} {item.last_name}
                      </div>
                    </td>
                    <td>
                      <div className="data">{item.phone_number}</div>
                    </td>
                    <td>
                      <div className="data">12-05-2021 17:33:15</div>
                    </td>
                    <td>
                      <div className="actions">
                        <div
                          className="action"
                          onClick={() => {
                            findUser(item.id);
                          }}
                        >
                          <BiPlayCircle />
                        </div>
                        <div
                          className="action"
                          onClick={() => {
                            DeleteShow(item.id);
                          }}
                        >
                          <BiTrashAlt />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={ConsultClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Consult user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 text-center">
            <div
              className="avatar m-auto"
              style={{ backgroundImage: "url(" + userConsult.avatar + ")" }}
            ></div>
          </div>
          <div className="tableOfData mt-3">
            <table className="w-100">
              <tr>
                <th>First Name :</th>
                <td>{userConsult.first_name}</td>
              </tr>
              <tr>
                <th>Last Name :</th>
                <td>{userConsult.last_name}</td>
              </tr>
              <tr>
                <th>Email :</th>
                <td>{userConsult.email}</td>
              </tr>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ConsultClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDelete}
        onHide={DeleteClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DeleteClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              DeleteClose();
              PasswordValidShow();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showPasswordValid}
        onHide={PasswordValidClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confiramation Of password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="validationPassword">
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={getPassword}
          />
          <p className="messageError">{errorValidationPassword}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={PasswordValidClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={verificationPassword}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
