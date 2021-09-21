
/**
 * https://www.codewars.com/kata/52423db9add6f6fc39000354/train/javascript
 * @param {number[][]} rows 
 * @param {number} generations 
 */
function getGeneration(rows, generations) {
    const height = rows.length;
    const width = rows[0].length;
    let new_gen = []


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

    // fill new gen
    new_gen = new Array(width).fill().map(
        e=>new Array(height).fill(0)
    )
    console.log({rows,new_gen})

    //console.log(htmlize(rows));
    for (let y = 1; y < rows.length-1; y++) {
        const row = rows[y];
        for (let x = 1; x < row.length-1; x++) {
            const cell = row[x];
            const neigbours = 0
                + rows[y - 1][x - 1]
                + rows[y - 1][x]
                + rows[y - 1][x + 1]
                + rows[y][x - 1]
                //+ rows[y][x]
                + rows[y][x + 1]
                + rows[y + 1][x - 1]
                + rows[y + 1][x]
                + rows[y + 1][x + 1]
            
            if (neigbours < 2 || neigbours > 3) {
                new_gen[y-1][x-1] = 0
            }else{
                new_gen[y-1][x-1] = 1
            }

            console.log({
                y,x,neigbours
            });
        }
    }
    return new_gen
}


getGeneration([
    [1, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ])