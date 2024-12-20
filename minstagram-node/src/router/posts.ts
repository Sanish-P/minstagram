import { NextFunction, Request, Response, Router } from "express";

import Post from "../models/post";
import { postListDTO } from "../dto/post";
import User from "../models/user";
import Reaction from "../models/reaction";
import { IVerifiedRequest } from "../middleware/verification";

const PostRouter = Router();

PostRouter.get("/", async (req: Request, res: Response) => {
	const postList = await Post.find()
		.sort("-createdAt")
		.populate("imageId")
		.populate({
			path: "author",
			select: "email",
			populate: {
				path: "profile",
			},
		});
	res.json(postListDTO(postList));
});

PostRouter.post("/", async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
	try {
		if (req.auth) {
			const foundMan = await User.findById(req.auth.userId);
			if (foundMan) {
				const newPost = await Post.create({
					imageId: req.body.imageId,
					caption: req.body.caption,
					author: req.auth.userId,
				});
				foundMan.posts.push(newPost.id);
				await foundMan.save();
				res.json(newPost);
			} else {
				throw new Error("Can't find anyone myan");
			}
		} else {
			throw new Error("No userId bruh!!");
		}
	} catch (error) {
		next(error);
	}
});

PostRouter.patch("/:postId/react", async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
	try {
		if (req.auth) {
			const newReaction = {
				reactedBy: req.auth.userId,
				reaction: req.body.reactionId,
			};
			const [postToUpdate, reactor, reactionType] = await Promise.all([
				Post.findById(req.params.postId),
				User.findById(newReaction.reactedBy),
				Reaction.findById(newReaction.reaction),
			]);

			if (postToUpdate && reactor && reactionType) {
				const filteredReactions = postToUpdate.reactions.filter(
					({ reactedBy }) => reactedBy.toString() !== newReaction.reactedBy,
				);
				const updatedReactions = [...filteredReactions, newReaction];
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.postId,
					{
						reactions: updatedReactions,
					},
					{ new: true },
				);
				res.json(updatedPost);
			} else {
				throw new Error("Params are invalid");
			}
		} else {
			throw new Error("Id is absent");
		}
	} catch (error) {
		next(error);
	}
});

export default PostRouter;
