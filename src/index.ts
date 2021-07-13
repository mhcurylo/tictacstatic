import * as fs from "fs";

const renderIndex = (baseUrl: string) =>
  `<!doctype html>
<html>
  <head>
    <title>Tic Tac Static</title>
  </head>
  <body>
    <div style="margin-top: 100px; width: 100%; display: flex; align-items: center; flex-direction: column; justify-content: center;">
      <img src="${baseUrl}/favicon.ico" alt="StaTic" width="32" height="32"/>
      <a style="display: inline-block; text-decoration: none;" href="${baseUrl}/pvp/---------.html" ><div style="width: 300px; text-align: center; margin-bottom: 10px; margin-top: 10px">Player vs Player</div></a>
      <a style="display: inline-block; text-decoration: none;" href="${baseUrl}/ai/---------.html"><div style="width: 300px; text-align: center; margin-bottom: 10px">Player vs AI</div></a>
    </div>
  </body>
</html>`;

export const createIndex = (baseUrl: string, baseDir: string): void => {
  if (!fs.existsSync(`${baseDir}`)) {
    fs.mkdirSync(`${baseDir}`);
  }

  fs.copyFileSync("./resources/favicon.ico", `${baseDir}/favicon.ico`);

  fs.writeFileSync(`${baseDir}/index.html`, renderIndex(baseUrl));
};
