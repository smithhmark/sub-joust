
export const randomArgs = (domain) => {
  let args = [];
  for (const dom of domain) {
    let span = dom.max - dom.min;
    let tmp = Math.random() * span + dom.min;
    args.push(tmp);
  }
  return args;
};

export const centralArgs = (domain) => {
  let args = [];
  for (const dom of domain) {
    let tmp = dom.max + dom.min;
    args.push(tmp/2);
  }
  return args;
};

export const argsAround = (args, domain) => {
  let argsToTry = [];
  let temp;
  for (let ii = 0 ; ii < args.length ; ii++) {
    temp = args.slice();
    temp[ii]--;
    if (temp[ii] >= domain[ii].min) {
      argsToTry.push(temp);
    }
    temp = args.slice();
    temp[ii]++;
    if (temp[ii] <= domain[ii].max) {
      argsToTry.push(temp);
    }
  }
  return argsToTry;
};

const sortHelper = (a, b) =>{
  if (a[0] > b[0]) return 1;
  if (b[0] >a[0]) return -1;
  return 0;
}

export const stepwiseDescent = (fn, startingArgs, domain, steps) => {
  let best = fn(startingArgs);
  let bestArgs = startingArgs;
  let neighbors;
  let step;
  for (step = 0 ; step < steps ; step++) {
    let results = [];
    neighbors = argsAround(bestArgs, domain);
    for (const neigh of neighbors) {
      //result = fn(...neigh);
      results.push([fn(...neigh), neigh]);
    }
    results.sort(sortHelper);
    //console.log("best of round:", results[0]);
    //console.log("round:", results);
    if (results[0][0] < best) {
      best = results[0][0];
      bestArgs = results[0][1];
    } else {
      return {val:best,
        args:bestArgs,
        steps:step,};
    }
  }
  return {val:best,
        args:bestArgs,
        steps:step,};
}

export const minimize = (fn, argMap, domain, runs=1000) => {
  let rr = 0;
  let best;
  let bestArgs;
  for ( ; rr < runs ; rr++) {
    args = buildArgs(domain);
    result = fn(...args);
    if (result < best) {
      best = result;
      bestArgs = args;
    }
  }
}
