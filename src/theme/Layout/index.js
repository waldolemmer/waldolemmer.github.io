import React from 'react';
import Layout from '@theme-original/Layout';
import { useLocation } from '@docusaurus/router';

export default function LayoutWrapper(props) {
  const { pathname } = useLocation();
  const safePath = pathname === '/' ? 'root' : pathname;
  const pixelUrl = `https://waldolemmer.goatcounter.com/count?p=${encodeURIComponent(safePath)}`;

  return (
    <Layout {...props}>
      {props.children}

      <img
        src={pixelUrl}
        style={{ width: 0, height: 0, border: 0, display: 'none' }}
        alt=""
      />

      <noscript>
        <img
          src={pixelUrl}
          style={{ width: 0, height: 0, border: 0, display: 'none' }}
          alt=""
        />
      </noscript>
    </Layout>
  );
}
