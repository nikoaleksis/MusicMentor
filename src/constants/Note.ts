enum Note {
  C = 'C',
  C_Sharp = 'C#',
  D = 'D',
  D_Sharp = 'D#',
  E = 'E',
  F = 'F',
  F_Sharp = 'F#',
  G = 'G',
  G_Sharp = 'G#',
  A = 'A',
  A_Sharp = 'A#',
  B = 'B'
};

function circularNoteCollector(startNote: Note, amountOfNotes: number): Note[] {
  let noteIndex = Object.keys(Note).indexOf(startNote);
  let iterationIndex = 0;
  const notes: Note[] = [];

  const values: Note[] = Object.values(Note);

  while(iterationIndex < amountOfNotes) {
    noteIndex = (noteIndex + 1) % (Object.keys(Note).length);

    notes.push(values[noteIndex]);    

    iterationIndex++
  }

  return notes;
}

export { Note, circularNoteCollector };