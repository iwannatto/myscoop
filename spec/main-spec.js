'use babel';

import Main from '../lib/main';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Main', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('myscoop');
  });

  describe('open test1.c', () => {
    let sourceEditor;
    let sourceFileName = __dirname + '/testcase/test1.c';
    let scoopFileName = __dirname + '/testcase/test1_scoop.c';

    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open(sourceFileName).then((editor) => { sourceEditor = editor; });
      });
    });

    it('have not opened test1_scoop.c yet before myscoop:scoop', () => {
      for (let item of atom.workspace.getPaneItems()) {
        expect(item.getPath()).not.toBe(scoopFileName);
      }
    });

    describe('select specific line, dispatch myscoop:scoop', () => {
      let selectedLine = 14;
      beforeEach(() => {
        sourceEditor.setCursorBufferPosition([selectedLine, 0]);
        atom.commands.dispatch(workspaceElement, 'myscoop:scoop');
        waitsForPromise(() => { return activationPromise; });
        waitsFor(() => atom.workspace.getActivePaneItem().getPath() === scoopFileName);
      });

      it('copies selected line to scoop editor', () => {
        let scoopEditor = atom.workspace.getActiveTextEditor();
        expect(scoopEditor.lineTextForBufferRow(1)).toBe(sourceEditor.lineTextForBufferRow(selectedLine));
      });

      describe('dispatch myscoop:detect', () => {
        let scoopEditor;

        beforeEach(() => {
          scoopEditor = atom.workspace.getActiveTextEditor();
          atom.commands.dispatch(workspaceElement, 'myscoop:detect');
        });

        it('marks undefined variable', () => {
          expect(scoopEditor.findMarkers({})).not.toEqual([]);
        });
      });
    });
  });
});
