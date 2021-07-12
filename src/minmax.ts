// AI, good enough, enjoys longer games.
import * as Domain from './domain'

const memoed = new Map();

export const minmax = (s: Domain.State, p: Domain.Field): number => {
 const str = Domain.stringify(s)

 if (memoed.has(str)) {
   return memoed.get(str);
 }

  if (Domain.isFinished(s)) {
    const r = Domain.result(s);
    const result = r === 'x' ? 10 : (r === 'o' ? (-10) : 0)
    memoed.set(str, result);

    return result;
  }

  const futures = Domain.nextStates(s).map(({s}) => minmax(s, p));
  const result = Domain.player(s) === p ? Math.max.apply(null, futures) + 1 : Math.min.apply(null, futures) + 1;

  memoed.set(str,result);

  return result;
}

export const chooseMove = (state: Domain.State): Domain.FieldNumber | null => {
  const candidates = Domain.nextStates(state).map(({f,s}) => ({f, evaluate: minmax(s, Domain.player(state))}));
  candidates.sort((a, b) => b.evaluate - a.evaluate);

  return candidates.length > 0 ? candidates[0].f : null;
}


