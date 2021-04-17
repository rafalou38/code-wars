/*
Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples

The output expected would be:

apples, pears
grapes
bananas

The code would be called like so:

result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
# result should == "apples, pears\ngrapes\nbananas"
*/

/**
 *
 * @param {string} input
 * @param {string[]} markers
 */
function solution(input, markers) {
  const reg = new RegExp(
    "\\s(" + markers.map((m) => "\\" + m).join("|") + ")" + ".*$",
    "gm"
  );
  return input.replace(reg, "");
}

solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]),
  "apples, plums\npears\noranges";
// console.log(solution("Q @b\nu\ne -e f g",  ["@", "-"])) // "Q\nu\ne"
