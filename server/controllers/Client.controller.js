import Client from "../models/Client.model.js";
import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

// Update a Client
const updateClient = async (req, res) => {
  const client = await Client.findOne({ _id: req.client.Client });

  client.email = req.body.email || client.email;
  client.firstname = req.body.firstname || client.firstname;
  client.lastname = req.body.lastname || client.lastname;

  client.birth_date = req.body.birth_date || client.birth_date;
  client.country = req.body.country || client.country;
  client.state = req.body.state || client.state;
  client.city = req.body.city || client.city;
  client.zip_code = req.body.zip_code || client.zip_code;
  client.address = req.body.address || client.address;

  client.numTel = req.body.numTel || client.numTel;
  client.verified = req.body.verified || client.verified;

  await client.save();
  //   const token = client.createJWT();
  res.status(StatusCodes.OK).json({ client });
};

// get all clients

const getAllClient = (req, res) => {
  console.log(req.client.Client);
  Client.find()
    .then((val) => {
      res.status(200).json(val);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getClientData = async (req, res) => {
  // {
  //   firstname: myData.firstname,
  //   lastname: myData.lastname,
  //   email: myData.email,
  //   password: "",
  //   newPassword: "",
  //   birthday: myData.birthday,
  //   address: myData.address,
  //   codePostal: myData.codePostal,
  //   ville: myData.ville,
  //   country: myData.country,
  //   phone: myData.phone,
  // }
  try {
    let authHeader = req.headers.authorization;
    authHeader = authHeader || authHeader.startsWith("Bearer");
    const token = authHeader.split(" ")[1];
    // console.log("+++++", token);
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
    // console.log(payload);
    const clientId = payload.Client;
    // console.log(clientId);
    Client.findById(clientId)
      .select("+password")
      .then((val) => {
        const cli = {
          firstname: val.firstname,
          lastname: val.lastname,
          email: val.email,
          password: "",
          newPassword: "",
          birthday: val.birth_date,
          address: val.address,
          codePostal: val.zip_code,
          country: val.country,
          state: val.state,
          ville: val.ville,
          phone: val.numTel,
        };
        res.status(StatusCodes.OK).json(cli);
      })
      .catch((err) => {
        throw new BadRequestError(err);
      });
  } catch (err) {
    throw new BadRequestError(err);
  }
};

const getClientById = (req, res) => {
  Client.findById(req.params.id)
    .then((val) => {
      res.status(StatusCodes.OK).json({ val });
    })
    .catch((err) => {
      throw new BadRequestError(err);
    });
};

// get verified clients
const getVerifiedClients = (req, res) => {
  Client.find({ verified: true })
    .then((val) => {
      res.status(200).json(val);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getNoneVerifiedClients = (req, res) => {
  Client.find({ verified: false })
    .then((val) => {
      res.status(200).json(val);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteClient = (req, res) => {
  Client.deleteOne({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.ACCEPTED).json(val);
    })
    .catch((err) => {
      res.status(StatusCodes.FORBIDDEN).json(err);
    });
};

export {
  updateClient,
  deleteClient,
  getAllClient,
  getClientData,
  getClientById,
  getVerifiedClients,
  getNoneVerifiedClients,
};
