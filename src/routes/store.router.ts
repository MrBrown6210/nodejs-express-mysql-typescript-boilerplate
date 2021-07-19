import express from "express";
import httpStatus from "http-status";
import StoreController from "../controllers/store.controller";
import ApiError, { errorHandler } from '../utils/APIError'

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new StoreController();
  const response = await controller.getStores();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new StoreController();
  const response = await controller.createStore(req.body);
  return res.send(response);
});

router.get("/:id", errorHandler(async (req, res) => {
  const controller = new StoreController();
  const response = await controller.getStore(req.params.id);
  if (!response) throw new ApiError(httpStatus.NOT_FOUND, 'No store found')
  return res.send(response);
}));

router.delete("/:id", errorHandler(async (req, res, next) => {
    const controller = new StoreController()
    const response = await controller.removeStore(req.params.id)
    if (!response) throw new ApiError(httpStatus.NOT_FOUND, "No store found")
}))

export default router;