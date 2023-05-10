import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

/**
 * @function getPostBySlug
 * @description Get post by slug
 * @param {string} slug
 * @param {string[]} fields
 * @returns {object}
 */

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fullPath = join(postsDirectory, slug.indexOf('.md') !== -1 ? slug : slug + '.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  interface Items {
    [key: string]: string;
  }

  const items: Items = {};

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = slug.replace('/.md$/', '');
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
};

export function getAllPosts(fields: string[] = []) {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map(slug => getPostBySlug(slug, fields));
  return posts;
}
