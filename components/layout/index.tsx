import React, { ReactNode } from 'react';
import Sidebar from '@/components/sidebar';
import STYLES from './index.module.css';

function Index(children: ReactNode) {
  return (
    <div className={`${STYLES['wrapper']} flex align-center`}>
      <Sidebar wrapperClass="w-1/4" />
      <main className="ml-5 p-5 w-3/4">{children}</main>
    </div>
  );
}

export default Index;
