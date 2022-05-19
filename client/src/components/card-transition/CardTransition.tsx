import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ANIMATION_TIMEOUT } from '../../utils/constants';
import './transition.scss';

export const CardTransition = (props: any) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      {...props}
      nodeRef={nodeRef}
      timeout={ANIMATION_TIMEOUT}
      classNames="item"
    >
      <>
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child as any, { ref: nodeRef });
        })}
      </>
    </CSSTransition>
  );
};
