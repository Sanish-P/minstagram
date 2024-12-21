import React from 'react';
import styled from 'styled-components';
import { IPost } from '../home/Post';
import Reactions from '../home/Reactions';

const PostCollageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.img`
  max-width: 250px;
  max-height: 250px;
  min-width: 250px;
  min-height: 250px;
`

const PostWrapper = styled.div`
  display: column;
  align-items: center;
  justify-content: space-between;
`

const SinglePost: React.FC<IPost> = ({ id, imageUrl, reactions }) => (
  <PostWrapper>
    <ImageWrapper src={imageUrl} />
    <Reactions disabled emojiSize="25px" reaction={reactions} postId={id} onReactionChange={() => {}} />
  </PostWrapper>
)

const PostCollage: React.FC<{ posts: Array<IPost>}> = ({ posts }) => {
  return (
    <PostCollageWrapper>
      {posts.map((post) => <SinglePost key={post.id} {...post} />)}
    </PostCollageWrapper>
  );
};

export default PostCollage;