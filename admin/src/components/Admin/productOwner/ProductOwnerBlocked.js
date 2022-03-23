import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiPlayCircle, BiCheckCircle } from "react-icons/bi";
import { Modal, Button, Spinner } from "react-bootstrap";
import api from "./../../../config.service";
import convertDate from "./../../../function";

const ProductOwnerBlocked = () => {
  //modal details
  const [showDetails, setDetailsShow] = useState(false);
  const DetailsClose = () => setDetailsShow(false);
  const DetailsShow = () => setDetailsShow(true);

  //Modal deblock
  const [showDeblock, setDeblockShow] = useState(false);
  const DeblockClose = () => setDeblockShow(false);
  const DeblockShow = () => setDeblockShow(true);

  //id for the fonctionality of Modal
  const [POToDeblock, setPOToDeblock] = useState(0);

  //data of modal detils
  const [POConsult, setPOConsult] = useState({});
  // function find PO
  function findPO(id) {
    setPOConsult(POs.find((user) => user._id === id));
    DetailsShow();
  }
  // loading icon activation
  const [loading, setLoading] = useState(false);
  //errer validation password
  const [errorValidationPassword, seterrorValidationPassword] = useState("");
  //password input
  const [password, setPassword] = useState("");

  const PasswordValidShow = () => setPasswordValidShow(true);
  const [showPasswordValid, setPasswordValidShow] = useState(false);
  const PasswordValidClose = () => {
    setPasswordValidShow(false);
    setPassword("");
    seterrorValidationPassword("");
  };

  function DeblockPO() {
    if (POToDeblock !== 0) {
      //api Deblock with id of POToDeblock

      api
        .patch("/POs/unBlock/" + POToDeblock)
        .then((response) => {
          PasswordValidClose();
          const newPOList = POs.filter((user) => {
            return user._id !== POToDeblock;
          });
          setPOs(newPOList);
          setPOToDeblock(0);
          DeblockClose();
        })
        .catch((err) => {
          console.log(err);
          seterrorValidationPassword("Something Wrong!");
        });

      console.log("Accept" + POToDeblock);
    }
  }
  function findPack(pack) {
    var classPack = "";
    var NamePack = "";
    switch (pack) {
      case 1:
        classPack = "visibility gold";
        NamePack = "Gold";
        break;
      case 2:
        classPack = "visibility pro";
        NamePack = "Pro";
        break;
      default:
        classPack = "visibility pro";
        NamePack = "Pro";
        break;
    }
    return (
      <td>
        <div className="data">
          <div className={classPack}>{NamePack}</div>
        </div>
      </td>
    );
  }

  //function verification password
  const verificationPassword = async () => {
    setLoading(true);
    if (password.length === 0) {
      seterrorValidationPassword("Enter your Password");
    } else if (password.length < 8) {
      seterrorValidationPassword("Password should be at list 8 caractere");
    } else {
      await api
        .post("/api/v1/auth/Admin/verifyPassword", { password: password })
        .then((response) => {
          if (response.data.message) {
            DeblockPO();
          } else {
            seterrorValidationPassword("Password incorrect!");
          }
        })
        .catch((err) => {
          seterrorValidationPassword("Something Wrong!");
        });
    }
    setLoading(false);
  };
  //function to get Password
  function getPassword(val) {
    seterrorValidationPassword("");
    setPassword(val.target.value);
  }

  //begin api getAll
  const [POs, setPOs] = useState([]);
  const retrievePO = async () => {
    const response = await api.get("/bockedPOs");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllPO = async () => {
      const allUsers = await retrievePO();
      if (allUsers) setPOs(allUsers);
    };
    getAllPO();
  }, []);
  //end api getAll

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item">Product Owner</li>
          <li className="breadcrumb-item active" aria-current="page">
            Product Owner Blocked
          </li>
        </ol>
      </nav>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of Product Owner Blocked</h1>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="data picture">logo</div>
                </th>
                <th>
                  <div className="data">Company Name</div>
                </th>
                <th>
                  <div className="data">Email</div>
                </th>
                <th>
                  <div className="data">Pack</div>
                </th>
                <th>
                  <div className="data">Creation date</div>
                </th>
                <th>
                  <div className="data">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {POs.map((PO) => {
                return (
                  <tr key={PO._id}>
                    <td>
                      <div className="data">
                        <div
                          className="picture"
                          style={{
                            backgroundImage: "url(" + PO.logo_url + ")",
                          }}
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div className="data">{PO.company_name}</div>
                    </td>
                    <td>
                      <div className="data">{PO.company_email}</div>
                    </td>
                    {findPack(PO.pack)}
                    <td>
                      <div className="data">{convertDate(PO.createdAt)}</div>
                    </td>
                    <td>
                      <div className="actions">
                        <div
                          className="action p-1"
                          onClick={() => {
                            findPO(PO._id);
                          }}
                        >
                          <BiPlayCircle />
                        </div>

                        <div
                          className="action p-1"
                          onClick={() => {
                            setPOToDeblock(PO._id);
                            DeblockShow();
                          }}
                        >
                          <BiCheckCircle />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {POs.length === 0 ? (
            <div className="empty">
              <p>This table is empty</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal
        show={showDetails}
        onHide={DetailsClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 text-center">
            <div
              className="avatar m-auto"
              style={{ backgroundImage: "url(" + POConsult.logo_url + ")" }}
            ></div>
          </div>
          <div className="tableOfData mt-3">
            <table className="table mt-3">
              <tbody>
                <tr>
                  <th>Company Name :</th>
                  <td>{POConsult.company_name}</td>
                </tr>
                <tr>
                  <th>Company Email :</th>
                  <td>{POConsult.company_email}</td>
                </tr>
                <tr>
                  <th>Country :</th>
                  <td>{POConsult.country}</td>
                </tr>
                <tr>
                  <th>City :</th>
                  <td>{POConsult.city}</td>
                </tr>
                <tr>
                  <th>State :</th>
                  <td>{POConsult.state}</td>
                </tr>

                <tr>
                  <th>Zip Code :</th>
                  <td>{POConsult.zip_code}</td>
                </tr>
                <tr>
                  <th>Address :</th>
                  <td>{POConsult.address}</td>
                </tr>
                <tr>
                  <th>Professional Phone Number :</th>
                  <td>{POConsult.professional_phone_number}</td>
                </tr>
                <tr>
                  <th>Creation Date :</th>
                  <td>{POConsult.creation_date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeblock}
        onHide={DeblockClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Unblock</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really unblock ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DeblockClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              DeblockClose();
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
          <Modal.Title>Confirmation Of password</Modal.Title>
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
          <Button variant="danger w-100px" onClick={verificationPassword}>
            {loading ? (
              <Spinner animation="border" className="loadingIcon" />
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductOwnerBlocked;