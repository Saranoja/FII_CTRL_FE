import React from 'react';
import { InView } from 'react-intersection-observer';

const withInView = (Component) => (props) => {
  return (
    <InView>
      {({ inView, ref, entry }) => (
        <div ref={ref}>{inView && <Component {...props} />}</div>
      )}
    </InView>
  );
};

export default withInView;
