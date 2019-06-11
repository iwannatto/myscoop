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

    let intDecl = /^int ([a-zA-Z]+) = ([\w()]+);$/;
    result = intDecl.exec(line);
    if (result) {
      let [_, a, b] = result;
      let funApp_ = /^\w+\((\w+)\)$/;
      result = funApp_.exec(b);
      if (result) {
        // righthand funapp
        let [_, c] = result;
        if (!defined.includes(c) && !/^\d+$/.test(c)) {
          let j = lines[i].indexOf(c);
          flags.push(new Flag(c, [[i+1, j], [i+1, j+c.length]]));
        }
      } else if (!defined.includes(b) && !/^\d+$/.test(b)) {
        // righthant single variable
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
