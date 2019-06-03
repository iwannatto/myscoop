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

  describe('when the myscoop:scoop event is triggered and active editor is .c', () => {
    let sourceEditor;
    let sourceFileName = __dirname + '/testcase/test1.c';
    let scoopFileName = __dirname + '/testcase/test1_scoop.c';

    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open(sourceFileName).then((editor) => { sourceEditor = editor; });
      });
    });

    it('opens new editor in new right pain if active editor is .c', () => {
      // Before the toggle command, scoop editor does not exist
      for (let item of atom.workspace.getPaneItems()) {
        expect(item.getPath()).not.toBe(scoopFileName);
      }

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'myscoop:scoop');
      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // There exists test1_scoop.c
        waitsFor(() =>
          atom.workspace.getActivePaneItem().getPath() === scoopFileName
        );
        runs(() => { expect(true).toBe(true); });
      });
    });

    it('copies selected line to scoop editor', () => {
      expect(sourceEditor.getPath()).toBe(sourceFileName);
      sourceEditor.setCursorBufferPosition([1, 0]);
      atom.commands.dispatch(workspaceElement, 'myscoop:scoop');
      waitsForPromise(() => {
        return activationPromise;
      });
      runs(() => {
        waitsFor(() =>
          atom.workspace.getActivePaneItem().getPath() === scoopFileName
        );
        runs(() => {
          let scoopEditor = atom.workspace.getActiveTextEditor();
          expect(scoopEditor.lineTextForBufferRow(1)).toBe('  int a = b;');
        });
      })
    });

    it('detects undefined variable', () => {
      expect(sourceEditor.getPath()).toBe(sourceFileName);
      sourceEditor.setCursorBufferPosition([1, 0]);
      atom.commands.dispatch(workspaceElement, 'myscoop:scoop');
      waitsForPromise(() => {
        return activationPromise;
      });
      runs(() => {
        waitsFor(() =>
          atom.workspace.getActivePaneItem().getPath() === scoopFileName
        );
        runs(() => {
          let scoopEditor = atom.workspace.getActiveTextEditor();
          expect(scoopEditor.lineTextForBufferRow(1)).toBe('  int a = b;');
          atom.commands.dispatch(workspaceElement, 'myscoop:detect');
          expect(scoopEditor.findMarkers({})).not.toEqual([]);
        });
      })
    });
  });
});
