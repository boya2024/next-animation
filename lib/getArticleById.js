// lib/getArticleById.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import markdownToHtml from './markdownParser';

export async function getArticleById(id) {
  try {
    const articlesDirectory = path.join(process.cwd(), 'articles');
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析 front matter
    const matterResult = matter(fileContents);

    // 使用 remark 将 markdown 转换为 HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = await markdownToHtml(fileContents);

    return {
      id,
      markdownConent:fileContents,
      contentHtml,
      ...matterResult.data
    };
  } catch (error) {
    console.error('Error in getArticleById:', error);
    throw error;
  }
}