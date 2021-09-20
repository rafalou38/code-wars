
/**
 * 
 * @param {number[][]} rows 
 * @param {number} generations 
 */
function getGeneration(rows, generations) {
    const height = rows.length;
    const width = rows[0].length;
    const new_gen = []


    // add one cell around all
    rows = rows.map(row=>{
        return [
            0,
            ...row,
            0
        ]
    })
    rows = [
        new Array(width+2).fill(0),
        ...rows,
        new Array(width+2).fill(0),
    ]

    console.log(htmlize(rows));
    for (let y = 0; y < rows.length; y++) {
        const row = rows[y];
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            const neigbours = 0
                + rows[y - 1][x - 1]
                + rows[y - 1][x]
                + rows[y - 1][x + 1]
                + rows[y][x - 1]
                + rows[y][x]
                + rows[y][x + 1]
                + rows[y + 1][x - 1]
                + rows[y + 1][x]
                + rows[y + 1][x + 1]
            console.log({
                y,x,neigbours
            });
        }
    }
}