'use babel';

import Scoop from '../lib/scoop';
import Detector from '../lib/detector';

describe('Detector', () => {
  let workspaceElement, activationPromise, editor, scoop, detector;
  let fileName = __dirname + '/testcase/test1.c';

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('myscoop');
    waitsForPromise(() => {
      return atom.workspace.open(fileName).then((e) => { editor = e; });
    });
    runs(() => {
      scoop = new Scoop();
      scoop.setEditor(editor);
      detector = new Detector(scoop);
    });
  });

  it('detects undefined variable', () => {
    expect(detector.detect()).toEqual(['b']);
  });
});
