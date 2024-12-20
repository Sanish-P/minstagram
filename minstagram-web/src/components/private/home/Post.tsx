import * as React from 'react';
import styled from 'styled-components';
import Reactions, { IReactionMap } from './Reactions';

export interface IPost {
  id: string;
  imageUrl: string;
  caption: string;
  author: Record<string, string>;
  reactions: IReactionMap;
}


const PostWrapper = styled.div`
  display: grid;
  justify-items: center;
`

const ImageWrapper = styled.img`
  max-width: 335px;
`

interface IPostProps {
  post: IPost;
  onReactionChange: () => void;
}

const Post: React.FC<IPostProps> = ({ post, onReactionChange }) => {
  return (
    <PostWrapper className="post">
      <div style={{ padding: '10px' }} className="image">
        <ImageWrapper src={post.imageUrl} />
      </div>
      <div style={{ padding: '10px' }} className="caption">
        <span>{post.caption}</span>
      </div>
      <div style={{ padding: '10px'}}>
        <Reactions emojiSize="25px" onReactionChange={onReactionChange} postId={post.id} reaction={post.reactions} />
      </div>
    </PostWrapper>
  );
};

export default Post;