const formats = {
  year: 60 * 60 * 24 * 365,
  day: 60 * 60 * 24,
  hour: 60 * 60,
  minute: 60,
  second: 1,
};

function formatDuration(seconds) {
  if (!seconds) return "now";

  const result = {};
  for (const format in formats) {
    result[format] = ~~(seconds / formats[format]);
    if (result[format]) seconds -= formats[format] * result[format];
  }
  let end = [];
  for (const e in result) {
    if (result[e]) {
      end.push(result[e] + " " + (result[e] > 1 ? e + "s" : e));
    }
  }

  if (end.length == 1) {
    return end[0];
  }
  if (end.length == 2) {
    return end.join(" and ");
  } else {
    return end.slice(0, -1).join(", ") + " and " + end.slice(-1);
  }
}

console.log(formatDuration(120), "1 second");
// console.log(formatDuration(62), "1 minute and 2 seconds");
// console.log(formatDuration(120), "2 minutes");
// console.log(formatDuration(3600), "1 hour");
// console.log(formatDuration(3662), "1 hour, 1 minute and 2 seconds");
