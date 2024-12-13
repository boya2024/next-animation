import React from 'react';
import { getArticleById } from '../../../lib/getArticleById';
import path from 'path';
import fs from 'fs';
import {unified} from 'unified'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

interface PostData {
  id: string;
  markdownConent: string;
  contentHtml: string;
  title?: string;
  date?: string;
  [key: string]: any;
}

async function getPost(id: string): Promise<PostData | null> {
  try {
    const postData = await getArticleById(id);
    return postData;
  } catch (error) {
    console.error('获取文章错误:', error);
    return null;
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPost(params.id);

  if (!postData) {
    return <div>Article not found</div>;
  }

  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: true,
    })
    .use(rehypeStringify)

  const file = await processor.process(postData.markdownConent)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article 
        className="prose lg:prose-xl dark:prose-invert" 
        dangerouslySetInnerHTML={{__html: file.toString()}}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory).filter(filename => filename.endsWith('.md'));
  
  return filenames.map(filename => ({
    id: filename.replace(/\.md$/, ''),
  }));
} 