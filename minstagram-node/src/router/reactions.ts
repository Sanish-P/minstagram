import { Request, Response, Router } from "express";
import ReactionModel from "../models/reaction";
import { reactionListDTO } from "../dto/reactions";

const reactionRouter = Router();

reactionRouter.get("/", async (_: Request, res: Response) => {
	const reactions = await ReactionModel.find();
	res.json(reactionListDTO(reactions));
});

export default reactionRouter;
