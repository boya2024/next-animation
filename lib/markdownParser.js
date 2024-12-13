// lib/markdownParser.js
import MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki'
import Shiki from '@shikijs/markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.use(await Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'github-dark',
  }
}))

async function markdownToHtml(markdown) {
  const result = md.render(markdown);
  // console.log('result',result);
  return result
}

export default markdownToHtml;