// in-place shuffle(no new array is created)
export function fisherYatesShuffle(arr: any[]) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

export function popMultiple(arr: any[], count: number) {
  const retVal: any[] = [];
  for (var i = 0; i < count; i++) {
    const elem = arr.pop();
    if (elem) {
      retVal.push(elem);
    } else {
      break;
    }
  }
  return retVal;
}
