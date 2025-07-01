// src/api/Tonal.ts

import { Note } from "./Note";
import { Chord } from "./Chord";
import { Scale } from "./Scale";
import { NoteName } from "../notes";
import { ChordShape } from "../chord-shapes";

const Tonal = {
  note: (name: NoteName) => new Note(name),
  chord: (name: string) => {
    const [rootName, ...qualityParts] = name.split(" ");
    const quality = qualityParts.join("_").toUpperCase() as ChordShape;
    return new Chord(rootName as NoteName, quality);
  },
  scale: (name: string) => new Scale(),
};

export default Tonal; 