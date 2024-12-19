import React, { useContext } from 'react';
import axiosInstance from 'src/utils/axios';
import styled from 'styled-components';
import { ReactionsContext } from '../Router';


export interface IReactionMap {
  [reactionId: string]: number
}

export interface IReaction {
  id: string;
  emoji: string;
}

const ReactionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-column-gap: 60px;
  padding: 10px;
`

interface IReactionsProps {
  postId: string;
  reaction: IReactionMap;
  onReactionChange: () => void;
  emojiSize?: string;
  disabled?: boolean;
}

const Reactions: React.FC<IReactionsProps> = (props) => {
  const { reactions } = useContext(ReactionsContext)

  const addReaction = async (reactionId: string) => {
    try {
      await axiosInstance.patch(`/v1/posts/${props.postId}/react`, {
        reactionId
      })
      props.onReactionChange();
    } catch (error) {
      throw error;
    }
  }
  
  return (
    <ReactionWrapper className="reactions">
      {reactions.map(({ emoji, id }) => (
        <div key={id}>
          <span 
          style={
            { fontSize: `${props.emojiSize ? props.emojiSize : '80px'}`, 
            cursor: `${props.disabled ? 'auto':'pointer'}` }
            } 
            onClick={() => !props.disabled && addReaction(id)}>{emoji}</span>
          <span>{props.reaction[id] ? props.reaction[id] : 0}</span>
        </div>
      ))}
    </ReactionWrapper>
  );
};

export default Reactions;