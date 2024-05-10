import express from "express";
import finder from "./finder.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "GET request successfulll!!!!" });
  });

  app.use(express.json(), finder);
};

export default routes;
