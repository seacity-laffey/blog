import React, { useState } from 'react';
import Layout from '@/components/layout';
import STYLES from '@/components/pages/index.module.css';
import { GetStaticProps } from 'next';
import { getAllPosts } from './api/md';
import { getHtmlText } from '../common/utils';

type Post = {
  [key: string]: string;
};

type Props = {
  posts: Post[];
};

function Index(props: Props) {
  const { posts } = props;

  return (
    <div>
      {posts.map((item, index) => {
        const { text, isReadMore } = getHtmlText(item.content, true);
        return (
          <div key={index} className={`${STYLES['item']} bg-white`}>
            <div className="mb-14 text-center ">
              <div className="text-3xl text-neutral-600">{item.title}</div>
              <div className="mt-1 text-sm text-neutral-400">
                <span className="align-middle">{item.tag}</span>
                <span className={`${STYLES['slug']} align-middle`}>{item.slug}</span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
            {isReadMore && <div>read more</div>}
          </div>
        );
      })}
    </div>
  );
}

Index.getLayout = Layout;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['title', 'tag', 'slug', 'content']);
  return {
    props: { posts },
  };
};

export default Index;
