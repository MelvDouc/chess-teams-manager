import { Request, Response } from "express";

export default function asyncWrapper(handler: (req: Request, res: Response) => Promise<any>) {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      res.json(null);
    }
  };
}