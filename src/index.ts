import * as fs from "fs";

const renderIndex = (baseUrl: string) =>
  `<!doctype html>
<html>
  <head>
    <title>Tic Tac Static</title>
  </head>
  <body>
    <div style="margin-top: 100px; width: 100%; display: flex; align-items: center; flex-direction: column; justify-content: center;">
      <div style="width: 300px; text-align: center; margin-bottom: 10px">Tic Tac Static</div>
      <a style="display: inline-block; text-decoration: none;" href="${baseUrl}/pvp/---------.html" ><div style="width: 300px; text-align: center; margin-bottom: 10px">Player vs Player</div></a>
      <a style="display: inline-block; text-decoration: none;" href="${baseUrl}/ai/---------.html"><div style="width: 300px; text-align: center; margin-bottom: 10px">Player vs AI</div></a>
    </div>
  </body>
</html>`;

export const createIndex = (baseUrl: string, baseDir: string): void => {
  if (!fs.existsSync(`${baseDir}`)) {
    fs.mkdirSync(`${baseDir}`);
  }

  fs.writeFileSync(`${baseDir}/index.html`, renderIndex(baseUrl));
};
