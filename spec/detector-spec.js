'use babel';

import Scoop from '../lib/scoop';
import Detector from '../lib/detector';

describe('Detector, open scoop1.c, detect', () => {
  let workspaceElement, activationPromise, editor, scoop, detector;
  let fileName = __dirname + '/testcase/scoop1.c';

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('myscoop');
    waitsForPromise(() => {
      return atom.workspace.open(fileName).then((e) => { editor = e; });
    });
    runs(() => {
      scoop = new Scoop();
      scoop.setEditor(null, editor);
      detector = new Detector(scoop);
      detected = detector.detect();
    });
  });

  it('detects undefined variable in intDecl righthand', () => {
    let d = detected.find((e) => e[0] === 'a');
    expect(d[1][0]).toEqual([1, 10]);
    expect(d[1][1]).toEqual([1, 11]);
  });

  it('detects undefined variable in single funApp', () => {
    let d = detected.find((e) => e[0] === 'cursor');
    expect(d[1][0]).toEqual([2, 8]);
    expect(d[1][1]).toEqual([2, 14]);
  })
});
