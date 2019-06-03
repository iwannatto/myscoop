'use babel';

import Scoop from '../lib/scoop';
import Detector from '../lib/detector';

describe('Detector', () => {
  let workspaceElement, activationPromise, editor, scoop, detector;
  let fileName = __dirname + '/testcase/test2.c';

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
    });
  });

  it('detects undefined variable', () => {
    let detected = detector.detect();
    console.log(detected);
    let d = detected[0];
    expect(d[0]).toBe('a');
    expect(d[1][0]).toEqual([1, 10]);
    expect(d[1][1]).toEqual([1, 11]);
  });
});
