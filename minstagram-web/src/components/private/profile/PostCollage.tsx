import React from 'react';
import styled from 'styled-components';
import { IPost } from '../home/Post';
import Reactions from '../home/Reactions';

const PostCollageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 18px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;  
  }
`

const ImageWrapper = styled.img`
  max-width: 250px;
  max-height: 250px;
  min-width: 250px;
  min-height: 250px;
`

const PostWrapper = styled.div`
  display: grid;
  justify-items: center;
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