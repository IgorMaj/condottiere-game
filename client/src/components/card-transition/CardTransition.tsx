import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './transition.scss';

export const CardTransition = (props: any) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition {...props} nodeRef={nodeRef} timeout={500} classNames="item">
      <>
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child as any, { ref: nodeRef });
        })}
      </>
    </CSSTransition>
  );
};
