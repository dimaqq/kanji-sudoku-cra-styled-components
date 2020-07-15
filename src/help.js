import React, {useState} from "react";
import styled from "styled-components/macro";

const Help = () => {
  const [shown, show] = useState(false);
  return <Area>
    <Heading onClick={() => show(!shown)}>
      Help
      {shown?<Content>content</Content>:null}
    </Heading>
  </Area>;
};

export default Help;

const Area = styled.div`
  flex: 0 0 3vmin;
  outline: 1px dashed green;
  display: flex;
`;

const Heading = styled.div`
  position: relative;
`;

// FIXME 100vw requires global style to remove default margins and/or padding

const Content = styled.div`
  position: absolute;
  top: 3vmin;
  left: 0;
  width: 100vw;
  height: 30vmin;
  background: white;
  outline: 1px dashed blue;
`;
