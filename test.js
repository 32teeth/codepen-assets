let array = [
  new Promise((resolve, reject) =>{
    setTimeout(() => resolve(1), 2000) // 2 sec (Promise A)
  }),
  new Promise((resolve, reject) =>{
    setTimeout(() => resolve(2), 3000) // 3 sec (Promise B)
  }),
  new Promise((resolve, reject) =>{
    setTimeout(() => resolve(3), 1000) // 1 sec (Promise C)
  }),
  new Promise((resolve, reject) =>{
    setTimeout(() => resolve(4), 3000) // 3 sec (Promise D)
  })
];

Promise.sequentialOrderExecution = async function() {
  let results = [];
  for (let promise of array) {
    let result = await promise;
    results.push(result);
  }
  return results;
}

Promise.sequentialOrderExecution().then(result => {
  console.log(result); // [1, 2, 3, 4]
});