'use babel';

import Scoop from './scoop'

export default class Detector {
  constructor(scoop) {
    this.scoop = scoop;
  }

  detect() {
    let scoopEditor = this.scoop.editor;
    let lines = scoopEditor.getText().split('\n');
    lines = lines.slice(1, lines.length-3);

    let defined = [];
    let undef = [];
    for (let line of lines) {
      line = line.trim();
      let re = /int (\w+) = (\w+);/;
      let result = re.exec(line);
      if (!result) { continue; }

      let [_, a, b] = result;
      if (!defined.includes(b)) { undef.push(b); }
      defined.push(a);
    }

    return undef;
  }
}
