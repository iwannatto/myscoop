'use babel';

import Scoop from './scoop';

export class Flag {
  constructor(varName, range) {
    this.varName = varName;
    this.range = range;
  }
}

export function detect(scoopEditor) {
  let lines = scoopEditor.getText().split('\n');
  lines = lines.slice(1, lines.length-3);

  let defined = [];
  let flags = [];
  for (let i = 0; i < lines.length; ++i) {
    let line = lines[i].trim();
    let result;

    let intDecl = /^int ([a-zA-Z]+) = (\w+);$/;
    result = intDecl.exec(line);
    if (result) {
      let [_, a, b] = result;
      // if b have not defined and b don't include numbers, then b is undefined
      if (!defined.includes(b) && !/^\d+$/.test(b)) {
        let j = lines[i].indexOf(b);
        flags.push(new Flag(b, [[i+1, j], [i+1, j+b.length]]));
      }
      defined.push(a);
      continue;
    }

    // only b of a(b) is undefined variable
    let funApp = /^\w+\((\w+)\);$/;
    result = funApp.exec(line);
    if (result) {
      let [_, a] = result;
      if (!defined.includes(a) && !/^\d+$/.test(a)) {
        let j = lines[i].indexOf(a);
        flags.push(new Flag(a, [[i+1, j], [i+1, j+a.length]]));
      }
      continue;
    }
  }

  return flags;
}
