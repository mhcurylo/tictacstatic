import * as Domain from './domain';
import * as Minmax from './minmax';
import { renderHTML } from './renderer';
import * as fs from 'fs';


const nextState = (f:Domain.FieldNumber, s: Domain.State): Domain.State => {
  const pmove = Domain.move(s)(f);
  if (!pmove) return s;

  const choice = Minmax.chooseMove(pmove);
  if (choice === null) return pmove;

  const aimove = Domain.move(pmove)(choice);
  return aimove || pmove;
}


export const createAI = (baseUrl: string, baseDir: string): void => {
  const traversed = new Set();
    const linkMapper = (s: Domain.State, i: Domain.FieldNumber) =>
    `${baseUrl}/ai/${Domain.stringify(nextState(i, s))}.html`

  const render = renderHTML('Player vs AI', linkMapper);

  if (!fs.existsSync(`${baseDir}/ai`)) {
    fs.mkdirSync(`${baseDir}/ai`)
  }

  const traverse = (s: Domain.State): void => {
    const str = Domain.stringify(s);
    if (!traversed.has(str)) {
      traversed.add(str)
      fs.writeFileSync(`${baseDir}/ai/${str}.html`, render(s));
      Domain.possibleMoves(s).forEach(m => traverse(nextState(m,s)))
    }
  }

  traverse(Domain.initState);
}
