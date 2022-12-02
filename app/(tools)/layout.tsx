import { Nav } from '@/components/Nav';
import React from 'react';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col lg:flex-row-reverse">
      <div className="flex-grow overflow-auto">{children}</div>
      <Nav />
    </div>
  );
}
