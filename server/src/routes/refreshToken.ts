import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("req...", req);
    console.log("res...", res);
  } catch (e) {
    throw e;
  }
});

export default router;
