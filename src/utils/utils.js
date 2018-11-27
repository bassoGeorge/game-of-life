// Do a deep clone of the grid
export const cloneGrid = grid => grid.map(col => [...col]);

export const randomBoolean = () => Math.random() >= 0.5;

export const preferablyNegativeRandomBoolean = () => Math.random() >= 0.8;
