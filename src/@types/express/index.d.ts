import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        isAdm?: boolean;
        id?: string;
        email?: string;
        hotel?: string
      };
    }
  }
}
