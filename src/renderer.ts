import * as Domain from "./domain";

type LinkMapper = (s: Domain.State, i: Domain.FieldNumber) => string;

const renderField = (
  s: Domain.State,
  v: Domain.Field,
  i: Domain.FieldNumber,
  l: LinkMapper
): string => {
  return `<a style="display: inline-block; text-decoration: none;" href="${l(
    s,
    i
  )}"/><div style="width: 100px; height: 100px; font-size: 34px; display: flex;"><div style="margin: auto">${v}</div></div></a>`;
};

const renderResult = (v: Domain.Field): string =>
  `<div id="">${v == "-" ? "Draw" : "Winner: " + v}</div>`;

const render = (
  baseUrl: string,
  t: string,
  s: Domain.State,
  l: LinkMapper
): string =>
  `<div style="margin-top: 100px; width: 100%; display: flex; align-items: center; flex-direction: column; justify-content: center;"><img src="${baseUrl}/favicon.ico" alt="StaTic" width="32" height="32"/><div style="width: 300px; text-align: center; margin-bottom: 10px; margin-top: 10px;">${t}</div><div style="width: 300px; display: block; text-align: center;">${s
    .map((v, i) => renderField(s, v, i as Domain.FieldNumber, l))
    .join("")}</div><div>${
    Domain.isFinished(s) ? renderResult(Domain.result(s)) : ""
  }</div></div>`;

export const renderHTML =
  (baseUrl: string, t: string, l: LinkMapper) =>
  (s: Domain.State): string =>
    `<!doctype html>
<html>
  <head>
    <title>Tic Tac Static</title>
  </head>
  <body>
    ${render(baseUrl, t, s, l)}
  </body>
</html>`;
