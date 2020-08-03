import React from "react";
import styled from "styled-components/macro";

const Like = () => <A href="https://forms.gle/v6s3mCoHyfndDqxJA" target="_blank">
  <span role="img" aria-label="like">👍</span> ∕ <span role="img" aria-label="dislike">👎</span></A>;

export default Like;

const A = styled.a`
  flex: none;
  margin: auto 0 auto 1em;
  text-decoration: none;
  padding: .25em .5em;
  border: 1px solid black;
  border-radius: .5em;
  &:hover { background-color: rgba(255,0,0,.1); }
`;
