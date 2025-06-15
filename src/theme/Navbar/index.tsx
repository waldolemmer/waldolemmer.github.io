import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element | null {
  const {pathname} = useLocation();

  // Hide on the root (home) path:
  if (pathname === '/') {
    return null;
  }

  // Otherwise render the normal navbar
  return <Navbar {...props} />;
}
