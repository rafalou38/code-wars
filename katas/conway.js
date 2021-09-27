
/**
 * https://www.codewars.com/kata/52423db9add6f6fc39000354/train/javascript
 * @param {number[][]} rows 
 * @param {number} generations 
 */
function getGeneration(rows, generations) {
    const height = rows.length;
    const width = rows[0].length;
    let new_gen = []


    
    // add one cell of padding around the grid
    rows = rows.map(row => {
        return [
            0,
            ...row,
            0
        ]
    })
    rows = [
        new Array(width + 2).fill(0),
        ...rows,
        new Array(width + 2).fill(0),
    ]

    // reset new gen
    new_gen = new Array(width).fill().map(
        e => new Array(height).fill(0)
    )

    for (let y = 1; y < rows.length - 1; y++) {
        const row = rows[y];
        for (let x = 1; x < row.length - 1; x++) {
            const cell = row[x];
            const neigbours = 0
                + rows[y - 1][x - 1]
                + rows[y - 1][x]
                + rows[y - 1][x + 1]
                + rows[y][x - 1]
                + rows[y][x + 1]
                + rows[y + 1][x - 1]
                + rows[y + 1][x]
                + rows[y + 1][x + 1]

            if (cell) {
                if (neigbours < 2) {
                    new_gen[y - 1][x - 1] = 0
                } else if (neigbours > 3) {
                    new_gen[y - 1][x - 1] = 0
                }else{
                    new_gen[y - 1][x - 1] = 1
                }
            } else if (neigbours == 3) {
                new_gen[y - 1][x - 1] = 1
            }
        }
    }
    return new_gen
}
