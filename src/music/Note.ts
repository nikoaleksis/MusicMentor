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

function noteFromString(value: string): Note | undefined {
  if (Object.values(Note).includes(value as Note)) {
      return value as Note;
  }
  return undefined;
}

export { Note, noteFromString };