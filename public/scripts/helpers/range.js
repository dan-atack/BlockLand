// Ranger helper function at your service!
// Start and end are BOTH inclusive, e.g. (0, 10) returns an 11-member set (0 to 10).
const range = (start, end) => {
  let nums = [];
  for (let i = start; i <= end; i++) {
    nums.push(i);
  }
  return nums;
};
