const obj = {
    a: 1,
    b: 1,
    c: {
        d: 1,
        e: 1,
        f: {
            g: {
                h: {
                    i: 1,
                    j: 1
                }
            }
        }
    }
}


const iterate = (obj, initValue = '') => {
  let isSame = true;
  for (let index = 0; index < Object.keys(obj).length; index++) {
      const elmKey = Object.keys(obj)[index];
      const currRes = obj[elmKey]
   
    if (typeof currRes === 'object') {
       isSame = iterate(currRes, initValue);
    } else {
        if (initValue === '') {
            initValue = currRes;
        } else if (initValue !== currRes) {
            return false;
        }
    }    
  }
  return isSame;
}

console.log(iterate(obj));