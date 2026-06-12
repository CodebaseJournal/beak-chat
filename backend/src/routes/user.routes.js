import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ message: "Getting all Users" }));
userRouter.get("/:id", (req, res) =>
  res.send({ message: "Getting a single user by id" }),
);
userRouter.post("/", (req, res) =>
  res.send({ message: "Creating a new user" }),
);
userRouter.put("/", (req, res) =>
  res.send({ message: "Updating user profile" }),
);
userRouter.delete("/:id", (req, res) =>
  res.send({ message: "deleting a single user by id" }),
);
