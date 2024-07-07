import React from "react";

function convertMarkdownToHtml(markdown: String) {
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    let html = markdown.replace(boldRegex, '<strong>$2</strong>');
    const italicRegex = /(\*|_)(.*?)\1/g;
    html = html.replace(italicRegex, '<em>$2</em>');
    const nbspRegex = /\{nbsp\}/;
    html = html.replace(nbspRegex, "\u00A0");
    return html;
}

export const Markdown = (markdown: any) => {
    const createMarkup = () => {
        return {__html: convertMarkdownToHtml(markdown.markdown)};
    };

    return <div dangerouslySetInnerHTML={createMarkup()}/>;
};