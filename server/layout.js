"use strict";
/**
 * content 上下文 data后期需要挂在的数据
 */
module.exports = function layout(content, initState) {
  return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
					<meta name="theme-color" content="#000000">
					<title>React SSR</title>
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${content}</div>
            <script>window.__INITIAL_STATE__ =${JSON.stringify(
              initState
            )}</script>
        </body>
    </html>
    `;
};
