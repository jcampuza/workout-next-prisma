import React from 'react';
import { Nav } from './Nav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="overflow-auto">{children}</div>
      <Nav />
    </div>
  );
};
