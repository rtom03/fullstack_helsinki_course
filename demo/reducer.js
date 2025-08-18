function myReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If no initial value is given, take the first element
  if (accumulator === undefined) {
    accumulator = array[0];
    startIndex = 1;
  }

  console.log("Initial Accumulator:", accumulator);

  // Loop through array
  for (let i = startIndex; i < array.length; i++) {
    console.log(`Step ${i}:`);
    console.log("   Accumulator before:", accumulator);
    console.log("   Current Value:", array[i]);

    accumulator = callback(accumulator, array[i], i, array);

    console.log("   Accumulator after:", accumulator);
    console.log("-----------------------------");
  }

  return accumulator;
}
