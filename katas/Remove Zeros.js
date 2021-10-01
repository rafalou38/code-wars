// Sort "array" so that all elements with the value of zero are moved to the
// end of the array, while the other elements maintain order.
// [0, 1, 2, 0, 3] --> [1, 2, 3, 0, 0]
// Zero elements also maintain order in which they occurred.
// [0, "0", 1, 2, 3] --> [1, 2, 3, 0, "0"]

// Do not use any temporary arrays or objects. Additionally, you're not able
// to use any Array or Object prototype methods such as .shift(), .push(), etc


/**
 * https://www.codewars.com/kata/52aae14aa7fd03d57400058f
 * @param {(string|number)[]} array 
 * @returns {(string|number)[]}
 */
function removeZeros(array) {
    let newArray = [...array]
    let zeros = 0;
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        if (e === 0 | e === "0") {
            zeros++;
        }
    }


    let istart = 0;
    let iend = array.length - zeros;
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        if (e === 0 | e === "0") {
            newArray[iend] = e;
            iend++;
        } else {
            newArray[istart] = e;
            istart++;
        }
    }
    return newArray;
}
