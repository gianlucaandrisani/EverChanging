export const convertToMarkdown = (html) => {
  return html
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<ul>(.*?)<\/ul>/g, (match, content) =>
      content
        .replace(/<li>(.*?)<\/li>/g, '- $1')
        .split('\n')
        .map(line => line.trim())
        .join('\n')
    )
    .replace(/<\/p><p>/g, '\n\n')
    .replace(/<[^>]+>/g, '');
};

export const convertFromMarkdown = (markdown) => {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/- (.*?)(?=\n|$)/g, '<ul><li>$1</li></ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>'); // Ensure newlines are converted to <br>
};
