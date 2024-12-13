
import path from 'path';
import markdownToHtml from './markdownParser';

export async function getSortedArticlesData() {
  const articlesDirectory = path.join(process.cwd(), 'articles');

  // 获取所有.md文件名
  const filenames = require('fs').readdirSync(articlesDirectory).filter(filename => filename.endsWith('.md'));

  const allArticlesData = await Promise.all(filenames.map(async filename => {
    const id = filename.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, filename);
    const fileContents = require('fs').readFileSync(fullPath, 'utf8');

    // 解析Markdown文件
    const contentHtml = await markdownToHtml(fileContents);

    // 这里假设你的Markdown文件顶部有YAML front matter，如：
    // ---
    // title: My Article Title
    // date: 2023-01-01
    // ---
    const matterResult = fileContents.slice(0, fileContents.indexOf('\n\n')).trim();
    const matterData = matterResult.split('\n').reduce((acc, line) => {
      const [key, value] = line.split(': ');
      acc[key.trim()] = value.trim();
      return acc;
    }, {});

    return {
      id,
      ...matterData,
      contentHtml,
    };
  }));

  // 按日期排序文章
  return allArticlesData.sort(({ date: a }, { date: b }) => new Date(b) - new Date(a));
}