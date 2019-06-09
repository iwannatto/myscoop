'use babel';

import Scoop from './scoop'

export default class Resolver {
  constructor(scoop) {
    this.scoop = scoop;
    this.scoop.resolver = this;
  }

  suggest() {
    let undef = this.scoop.undef;
    let undef2 = [];
    for (let u of undef) {
      // console.log(u);
      u.push('insert declaration');
      u.push((e) => {
        let sourceLines = this.scoop.source.getText().split('\n');
        let insert = null;
        for (let i = 0; i < sourceLines.length; ++i) {
          if (sourceLines[i].trim().includes('int ' + u[0])) {
            insert = sourceLines[i] + '\n';
            break;
          }
        }
        if (insert !== null) {
          let range = [[u[1][0][0], 0], [u[1][0][0], 0]];
          // console.log(range);
          this.scoop.editor.setSelectedBufferRange(range);
          // console.log('a');
          this.scoop.editor.insertText(insert);
        }
        this.scoop.reset();
        // let t = e.target;
        // let s = t.parentNode;
        // s.parentNode.removeChild(s);
      });
      undef2.push(u);
    }
    return undef2;
  }

  // resolve() {
  //   let undef = this.scoop.undef;
  //   let sourceLines = this.scoop.source.getText().split('\n');
  //   for (let u of undef) {
  //     let insert = null;
  //     for (let i = 0; i < sourceLines.length; ++i) {
  //       if (sourceLines[i].trim().includes('int ' + u[0])) {
  //         insert = sourceLines[i] + '\n';
  //         break;
  //       }
  //     }
  //
  //     if (insert !== null) {
  //       let range = [[u[1][0][0], 0], [u[1][0][0], 0]];
  //       console.log(range);
  //       this.scoop.editor.setSelectedBufferRange(range);
  //       console.log('a');
  //       this.scoop.editor.insertText(insert);
  //     }
  //   }
  // }

}
