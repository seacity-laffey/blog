import React from 'react';
import Layout from '@/components/layout';
import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  return <p>tag</p>;
};

Index.getLayout = Layout;

export default Index;
