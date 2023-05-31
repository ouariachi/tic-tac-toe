const winningCombinations = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

export default class Board {
  content = [];
  
  /**
   * @param {HTMLDivElement | undefined} grid 
   */
  constructor(grid) {
    this.setContent(grid);
  }

  /**
   * @param {HTMLDivElement} grid 
   */
  setContent(grid) {
    if(!grid) return;
    this.resetContent();

    grid.querySelectorAll(".box").forEach(box => {
      const value = box.getAttribute("data-value");
      this.content.push(value ?? "");
    });
  }

  resetContent() {
    this.content = [];
  }

  checkWinner() {
    for(let [a, b, c] of winningCombinations) {
      if(
        this.content[a] === this.content[b] && 
        this.content[b] === this.content[c]
      ) return this.content[a];
    }

    return null;
  }
}