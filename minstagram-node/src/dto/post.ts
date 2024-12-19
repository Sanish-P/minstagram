import { IPost, IPostReaction } from "../models/post";
import config from "../config";
import { IUser } from "../models/user";

interface IPostAuthor {
  email: string;
  profileUrl: string;
}

interface IPostListItem {
  id: string;
  imageUrl: string;
  caption: string;
  author: IPostAuthor;
  reactions: IResponseMap;
}

export interface IResponseMap {
  [reactionId: string]: number
}

const parseAuthor = (user: IUser): IPostAuthor => {
  return {
    email: user.email,
    profileUrl: user.profile ? `${config.resource.staticPath}/${user.profile.path}` : ''
  }
}

export const postListDTO = (postList: Array<IPost>): Array<IPostListItem> => {
  const tranformedPostList = postList.map((post) => {
    const { id, imageId, caption, author, reactions } = post;

    return {
      id,
      imageUrl: `${config.resource.staticPath}/${imageId.path}`,
      caption,
      author: parseAuthor(author),
      reactions: createReactionMap(reactions)
    }
  })

  return tranformedPostList;
}

export const createReactionMap = (reactions: Array<IPostReaction>) => {
  const reactionMap = new Map<string, number>();

  for (const reaction of reactions) {
    const reactionId = reaction.reaction.toString();
    const reactionCount = reactionMap.get(reactionId)
    if(reactionCount) {
      reactionMap.set(reactionId, reactionCount + 1);
    } else {
      reactionMap.set(reactionId, 1);
    }
  };

  const responseMap: IResponseMap = {};

  for(const [reactionId, reactionCount] of reactionMap) {
    responseMap[reactionId] = reactionCount;
  }
  return responseMap;
}