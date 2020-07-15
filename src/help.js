import React, {useState} from "react";
import styled from "styled-components/macro";

const Help = () => {
  const [shown, show] = useState(false);
  return <Area>
    <Heading onClick={() => show(!shown)}>
      "Help"
    </Heading>
      {shown?<Content>content</Content>:null}
  </Area>;
};

export default Help;

const Area = styled.div`
  flex: none;
  outline: 1px dashed green;
  display: flex;
`;

const Heading = styled.div`
  position: relative;
`;

// FIXME 100vw requires global style to remove default margins and/or padding

const Content = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100vw;
  height: 200px;
  outline: 1px dashed blue;
`;
