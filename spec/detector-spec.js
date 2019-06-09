'use babel';

// import Scoop from '../lib/scoop';
import {Flag, detect} from '../lib/detector';

describe('Detector, open detector1.c', () => {
  let fileName = __dirname + '/testcase/detector1.c';
  let scoopEditor;

  beforeEach(() => {
    waitsForPromise(() => {
      return atom.workspace.open(fileName).then((editor) => { scoopEditor = editor; });
    });
  });

  describe('detect', () => {
    let flags
    beforeEach(() => {
      flags = detect(scoopEditor);
    });

    it('detects undefined variable in intDecl righthand', () => {
      let flag = flags.find((f) => f.varName === 'b');
      expect(flag.range).toEqual([[1, 10], [1, 11]]);
    });

    it('detects undefined variable in single funApp', () => {
      let flag = flags.find((f) => f.varName === 'c');
      expect(flag.range).toEqual([[2, 4], [2, 5]]);
    });
  });
});
