import * as Domain from "./domain";
import * as fs from "fs";
import { renderHTML } from "./renderer";

export const createPvP = (baseUrl: string, baseDir: string): void => {
  const traversed = new Set();
  const linkMapper = (s: Domain.State, i: Domain.FieldNumber) => {
    const nextState = Domain.move(s)(i);

    return `${baseUrl}/pvp/${Domain.stringify(nextState ? nextState : s)}.html`;
  };
  const render = renderHTML(baseUrl, "Player vs Player", linkMapper);

  if (!fs.existsSync(`${baseDir}/pvp`)) {
    fs.mkdirSync(`${baseDir}/pvp`);
  }

  const traverse = (s: Domain.State): void => {
    const str = Domain.stringify(s);
    if (!traversed.has(str)) {
      traversed.add(str);
      fs.writeFileSync(`${baseDir}/pvp/${str}.html`, render(s));
      Domain.nextStates(s).forEach(({ s }) => traverse(s));
    }
  };

  traverse(Domain.initState);
};
