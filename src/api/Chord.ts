// src/api/Chord.ts
import { ChordShapes, ChordShape } from '../chord-shapes';
import { Notes, NoteName } from '../notes';
import { rotate } from '../util/rotate';
import { getNotes } from '../util/getNotes';
import { Note } from './Note';

export class Chord {
  public readonly root: Note;
  public readonly quality: ChordShape;
  public readonly shape: number;
  public readonly notes: Note[];
  public readonly name: string;

  constructor(rootName: NoteName, quality: ChordShape) {
    if (!Notes[rootName]) {
      throw new Error(`Invalid root note name: ${rootName}`);
    }
    if (!ChordShapes[quality]) {
      throw new Error(`Invalid chord quality: ${quality}`);
    }

    this.root = new Note(rootName);
    this.quality = quality;
    this.name = `${rootName} ${quality}`;

    const baseShape = ChordShapes[quality];
    const rotation = this.root.index - Notes.C;
    this.shape = rotate(baseShape, rotation);
    
    const noteIndices = getNotes(this.shape);
    this.notes = noteIndices.map(index => Note.fromIndex(index));
  }
} 