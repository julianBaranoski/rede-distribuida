import fetch from "node-fetch";
import { data } from "../models/Data.js";

export default class FinderController {
  static find = async (req, res) => {
    try {
      const { id, visitedNeighbors } = req.query;

      if (id) {
        const result = await data.findOne({ _id: id });

        console.log("result", !!result);

        if (result) {
          return res.status(200).json({ found: true, data: result });
        }

        const knownNeighbors = process.env.VIZINHOS.split(",");

        let alreadyVisited = visitedNeighbors || "";

        const arrayAlreadyVisited = alreadyVisited.split(",");

        for (const neighbor of knownNeighbors) {
          if (arrayAlreadyVisited.includes(neighbor)) continue;

          alreadyVisited = alreadyVisited
            ? `${alreadyVisited},${process.env.DATABASE_NAME}`
            : `${process.env.DATABASE_NAME}`;

          const url = `http://${neighbor}:8000/find?id=${id}&visitedNeighbors=${alreadyVisited}`;

          const response = await fetch(url);

          const neighborResult = await response.json();

          if (neighborResult?.found) {
            return res
              .status(200)
              .json({ found: true, data: neighborResult.data });
          }
        }

        return res.status(200).json({ found: false, data: null });
      }

      return res.status(400).json({ message: `É necessário um ID na busca.` });
    } catch (e) {
      res.status(500).json({ message: `Erro interno no servidor: ${e}` });
    }
  };
}
