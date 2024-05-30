import axios from "axios";
import { corsMiddleware, runMiddleware } from "utils";

export default async function handler(req, res) {
  await runMiddleware(req, res, corsMiddleware);
  try {
    const response = await axios({
      method: "get",
      url: req.body.textProductUrl,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    throw error;
  }
}
