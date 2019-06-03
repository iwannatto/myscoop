'use babel';

import Scoop from './scoop'

export default class Detector {
  constructor(scoop) {
    this.scoop = scoop;
  }

  detect() {
    let scoopEditor = this.scoop.editor;
    let lines = scoopEditor.getText().split('\n');
    // console.log(lines);
    lines = lines.slice(1, lines.length-3);

    let defined = [];
    let undef = [];
    for (let i = 0; i < lines.length; ++i) {
      let line = lines[i].trim();
      let re = /int ([a-zA-Z]+) = (\w+);/;
      let result = re.exec(line);
      if (!result) { continue; }

      let [_, a, b] = result;
      console.log(b, !/^\d+$/.test(b));
      if (!defined.includes(b) && !/^\d+$/.test(b)) {
        let j = lines[i].indexOf(b);
        // console.log(i+1, j, i+1, j+b.length);
        undef.push([b, [[i+1, j], [i+1, j+b.length]]]);
      }
      defined.push(a);
    }

    return undef;
  }
}
