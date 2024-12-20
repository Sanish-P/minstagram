import { NextFunction, Request, Response, Router } from "express";

import User from "../models/user";
import { profileDTO, userListDTO } from "../dto/users";
import { generateToken, hashPassword } from "../service/auth";
import verification, { IVerifiedRequest } from "../middleware/verification";

const userRouter = Router();

userRouter.get("/", verification, async (req, res, next) => {
	try {
		const searchTerm = req.query.search;
		const searchRegx = new RegExp(`${searchTerm}`, "g");
		const userList = await User.find(
			{ email: searchRegx },
			"email profile",
		).populate("profile");
		const userListWithProfileDetails = userList.map(userListDTO);
		res.json(userListWithProfileDetails);
	} catch (error) {
		next(error);
	}
});

userRouter.post(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userFound = await User.findOne({ email: req.body.email });
			if (userFound) {
				throw new Error("User exists");
			}
			const passwordHash = hashPassword(req.body.password);

			const createdUser = await User.create({
				email: req.body.email,
				password: passwordHash,
				profile: req.body.profileId,
			});
			res.json(createdUser);
		} catch (error) {
			next(error);
		}
	},
);

userRouter.post(
	"/authorize",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userFound = await User.findOne({ email: req.body.email });
			if (userFound) {
				const passwordHash = hashPassword(req.body.password);

				if (passwordHash === userFound.password) {
					const { accessToken, expiresIn } = generateToken({
						id: userFound.id,
					});
					res.json({
						accessToken,
						expiresIn,
					});
				} else {
					throw new Error("You got it wrong bruh");
				}
			} else {
				throw new Error("Not found Bruh!");
			}
		} catch (error) {
			next(error);
		}
	},
);

userRouter.get(
	"/me",
	verification,
	async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
		try {
			if (req.auth) {
				const userFound = await User.findById(req.auth.userId)
					.populate("profile")
					.populate({
						path: "posts",
						populate: { path: "imageId", select: "path -_id" },
					});
				if (userFound) {
					res.json(profileDTO(userFound));
				} else {
					throw new Error("Not Found");
				}
			}
		} catch (error) {
			next(error);
		}
	},
);

userRouter.get(
	"/:userId",
	verification,
	async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
		try {
			const userFound = await User.findById(req.params.userId)
				.populate("profile")
				.populate({
					path: "posts",
					populate: { path: "imageId", select: "path -_id" },
				});
			if (userFound) {
				res.json(profileDTO(userFound));
			} else {
				throw new Error("Not Found");
			}
		} catch (error) {
			next(error);
		}
	},
);

userRouter.get(
	"/posts",
	verification,
	async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
		try {
			if (req.auth) {
				const userFound = await User.findById(req.auth.userId).populate([
					"posts",
				]);
				if (userFound) {
					res.json(userFound.posts);
				}
			}
		} catch (error) {
			next(error);
		}
	},
);

userRouter.patch(
	"/me",
	verification,
	async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
		try {
			if (req.auth) {
				const userFound = await User.findByIdAndUpdate(
					req.auth.userId,
					{
						profile: req.body.profileId,
					},
					{ new: true },
				);
				if (!userFound) {
					throw new Error("Don't exist bruh!!");
				}
				res.json(userFound);
			}
			throw new Error("No id bruh!!");
		} catch (error) {
			next(error);
		}
	},
);

export default userRouter;
