import { IUser } from '../models/user';

import config from '../config';
import { createReactionMap, IResponseMap } from './post';
import { IPost } from '../models/post';

interface IProfile {
  id: string;
  email: string;
  profileUrl: string;
  posts: IUserPost[];
}

interface IUserPost {
  id: string;
  imageUrl: string;
  caption: string;
  reactions: IResponseMap;
}

export const profileDTO = (user: IUser): IProfile => {
  const { email, profile, posts, id } = user;
  return {
    id,
    email,
    profileUrl: profile ? `${config.resource.staticPath}/${profile.path}` : '',
    posts: parsePosts(posts)
  }
}

const parsePosts = (posts: IPost[]): IUserPost[] => {
  return posts.map((post) => ({
    id: post.id,
    imageUrl: `${config.resource.staticPath}/${post.imageId.path}`,
    caption: post.caption,
    reactions: createReactionMap(post.reactions)
  }))
}


interface IUserListItem {
  id: string;
  email: string;
  profileUrl: string;
}

export const userListDTO = (user: IUser): IUserListItem => {
  const { email, profile, id } = user;
  return {
    id,
    email,
    profileUrl: profile ? `${config.resource.staticPath}/${profile.path}` : '',
  }
}