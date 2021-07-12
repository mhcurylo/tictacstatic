export type FieldNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0;

export type Field = "x" | "o" | "-";

export type State = [
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field
];

export const fieldNumbers: Array<FieldNumber> = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const playerFields: Array<Field> = ["x", "o"];

export const initState: State = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

export const player = (s: State): Field =>
  s.filter((field) => playerFields.includes(field)).length % 2 == 0 ? "o" : "x";

const isEmpty =
  (s: State) =>
  (p: FieldNumber): Boolean =>
    s[p] == "-";

export const possibleMoves = (s: State): Array<FieldNumber> =>
  fieldNumbers.filter(isEmpty(s));
export const nextStates = (s: State): Array<{ f: FieldNumber; s: State }> =>
  possibleMoves(s)
    .map((f) => ({ f, s: move(s)(f) }))
    .filter(({ s }) => !(s === null)) as Array<{ f: FieldNumber; s: State }>;

const boardFull = (s: State): boolean =>
  s.filter((v) => playerFields.includes(v)).length == 9;

export const result = (s: State): Field => {
  if (
    s[0] != "-" &&
    ((s[1] == s[0] && s[2] == s[0]) || (s[3] == s[0] && s[6] == s[0]))
  ) {
    return s[0];
  } else if (
    s[4] != "-" &&
    ((s[4] == s[3] && s[3] == s[5]) ||
      (s[4] == s[1] && s[4] == s[7]) ||
      (s[0] == s[4] && s[4] == s[8]) ||
      (s[2] == s[4] && s[4] == s[6]))
  ) {
    return s[4];
  } else if (
    s[8] != "-" &&
    ((s[8] == s[7] && s[8] == s[6]) || (s[8] == s[2] && s[8] == s[5]))
  ) {
    return s[8];
  } else {
    return "-";
  }
};

export const isFinished = (s: State): boolean =>
  result(s) != "-" || boardFull(s);

export const move =
  (s: State) =>
  (p: FieldNumber): State | null => {
    if (!isFinished(s) && isEmpty(s)(p)) {
      const r: State = [...s];
      r[p] = player(s);
      return r;
    } else {
      return null;
    }
  };

export const stringify = (s: State) => s.join("");
