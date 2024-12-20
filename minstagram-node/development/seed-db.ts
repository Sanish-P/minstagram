import mongoose from "mongoose";

import User from "../src/models/user";
import Post from "../src/models/post";
import Resource from "../src/models/resource";
import Reaction from "../src/models/reaction";
import { hashPassword } from '../src/service/auth';

async function seedInitialData() {
	const userDetails = [
		{
			email: "botAnother@test.com",
			password: "test123",
		},
		{
			email: "bot@test.com",
			password: "bot123",
		},
	];

	const reactionValues = ["❤️", "😑", "💩"];

	const files = ["meme_head.png", "toy_story.png"];

  const postDetails = [
		{
			caption: "LOL",
		},
		{
			caption: "Toy Story",
		},
		...Array.from(new Array(10).keys()).map((key) => ({
			caption: `Post ${key}`,
		})),
	];

  await mongoose.connect('mongodb://sanish:sanish@localhost:27017/', {
    user: 'sanish',
    pass: 'sanish',
  })

  console.log("Connected to DB");

  console.log("Seeding data...");
	const resources = await Promise.all(
		files.map(async (file) => {
      const resource = await Resource.findOne({ path: file });
      if(!resource) {
        return Resource.create({ path: file })
      }
      return resource;
    }),
	);

  console.log('Seeded resources ✅');

	const users = await Promise.all(
		userDetails.map(async (userData) => {
      const user = await User.findOne({ email: userData.email });
      if(!user) {
        return User.create({
          email: userData.email,
          password: hashPassword(userData.password),
        })
      }
      return user;
    }
		),
	);

  console.log('Seeded users ✅');

	const reactions = await Promise.all(
		reactionValues.map(async (emoji) => {
      const reaction = await Reaction.findOne({ emoji });
      if(!reaction) {
        return Reaction.create({ emoji })
      }
      return reaction;
    }),
	);

  console.log('Seeded reactions ✅');

	await Promise.all(
		postDetails.map(async (post) => {
      const existingPost = await Post.findOne({ caption: post.caption });

      if(!existingPost) {
        const userIndex = getRandomIndexBetween(0, users.length);
        const resourceIndex = getRandomIndexBetween(0, resources.length);
        const reactionIndex = getRandomIndexBetween(0, reactions.length);

        const author = users[userIndex];
        const imageId = resources[resourceIndex];
        const randomReaction = reactions[reactionIndex];
        const reaction = {
          reactedBy: users.find(user => user.id !== author.id),
          reaction: randomReaction,
        }

        if(!author || !imageId || !reactions) {
          throw new Error('Invalid random index');
        }
    
        return Post.create({
          caption: post.caption,
          imageId,
          author,
          reactions: [reaction],
        });
      }
      return post;
		}),
	);

  console.log('Seeded posts ✅');
}

function getRandomIndexBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

seedInitialData().then(() => {
  console.log("Data seeded successfully");
  process.exit(0);
});
