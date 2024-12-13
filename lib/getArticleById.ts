import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import markdownToHtml from './markdownParser';

interface PostData {
  id: string;
  markdownConent: string;
  contentHtml: string;
  title?: string;
  date?: string;
  [key: string]: any;
}

export async function getArticleById(id: string): Promise<PostData> {
  try {
    const articlesDirectory = path.join(process.cwd(), 'articles');
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = await markdownToHtml(fileContents);

    return {
      id,
      markdownConent: fileContents,
      contentHtml,
      ...matterResult.data
    };
  } catch (error) {
    console.error('Error in getArticleById:', error);
    throw error;
  }
} 