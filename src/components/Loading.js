import React from 'react';
import { css } from '@emotion/react';
import DotLoader from 'react-spinners/DotLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function Loading() {
  return <DotLoader css={override} color={'#3A8340'} size={150} />;
}
