import React from 'react';
import Layout from '@/components/layout';
import { GetStaticProps } from 'next';
import { getAllPosts, getPostBySlug } from '../api/md';
import { getHtmlText } from '../../common/utils';
import STYLES from './index.module.css';

interface Props {
  post: { title: string; slug: string; tag: string; content: string };
}

function Index(props: Props) {
  const { post } = props;
  const { text } = getHtmlText(post.content);

  return (
    <div className={`${STYLES['wrapper']} bg-white`}>
      <div className="mb-14 text-center ">
        <div className="text-3xl text-neutral-600">{post.title}</div>
        <div className="mt-1 text-sm text-neutral-400">
          <span className="align-middle">{post.tag}</span>
          <span className={`${STYLES['slug']} align-middle`}>{post.slug}</span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );
}

Index.getLayout = Layout;

export const getStaticProps: GetStaticProps = async context => {
  const post = getPostBySlug(context?.params?.slug as string, ['title', 'slug', 'tag', 'content']);
  return {
    props: { post },
  };
};

export default Index;

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
