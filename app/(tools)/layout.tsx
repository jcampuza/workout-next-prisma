import { Nav } from '@/components/Nav';
import React from 'react';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="overflow-auto">{children}</div>
      <Nav />
    </div>
  );
}
