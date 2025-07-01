// src/api/Note.ts
import { Notes, NoteName, NoteIndex, noteNamesByIndex } from '../notes';

export class Note {
  public readonly name: NoteName;
  public readonly index: NoteIndex;

  constructor(name: NoteName) {
    if (Notes[name] === undefined) {
      throw new Error(`Invalid note name: ${name}`);
    }
    this.name = name;
    this.index = Notes[name];
  }

  transpose(semitones: number): Note {
    const newIndex = (this.index - semitones + 12) % 12;
    // Find the new note name. We'll take the first name if there are enharmonic equivalents.
    const newName = noteNamesByIndex[newIndex][0];
    return new Note(newName);
  }

  static fromIndex(index: NoteIndex): Note {
    if (index < 0 || index > 11) {
      throw new Error(`Invalid note index: ${index}`);
    }
    const name = noteNamesByIndex[index][0];
    return new Note(name);
  }
} 