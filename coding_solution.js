// const arr = [7, 2, 3, 1, 2, 3, 1, 6, 2, 3];
// const arr = [4,8,5,2,4];
const arr = [1, 2];
const size = arr.length;
const k = 3;
let a = computeSum(size, k, arr);

function computeSum(n, k, arr) {
  const op = [];
  let i = 0;
  while (i < arr.length - 1) {
    //Loop through the array again and get values
    const tempArr = [];
    while (arr[i] <= k) {
      tempArr.push(arr[i]);
      i += 1;
    }
    if (tempArr.includes(k)) op.push(tempArr);
    while (arr[i] > k) {
      i += 1;
    }
  }
  return op.reduce((sum, elem) => sum + elem.length, 0);
}
