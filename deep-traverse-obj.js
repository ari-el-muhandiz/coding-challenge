const obj = {
    a: 1,
    b: 1,
    c: {
        d: 1,
        e: 1,
        f: {
            g: {
                h: {
                    i: 2,
                    j: {
                        k: 1,
                        l: 1,
                        m: {
                            n: 1,
                            o: 1
                        }
                    }
                }
            }
        }
    },
    p: 1
}

const obj1 = {
    a: {
        k: 1
    },
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

const objeckChecker = (obj) => {
  let valKey = '';
  const iterate = (obj) => {
    let isSame = true;

    for (let index = 0; index < Object.keys(obj).length; index++) {
        const elmKey = Object.keys(obj)[index];
        const currRes = obj[elmKey]
      
      if (typeof currRes === 'object') {
         isSame = iterate(currRes);
      } else {
          if (valKey === '') {
              valKey = currRes;
          } else if (valKey !== currRes) {
              return false;
          }
      } 
      if (!isSame) {
        break;          
      }
   
    }
    return isSame;
  }

  return iterate(obj);
}

console.log(objeckChecker(obj));
console.log(objeckChecker(obj1));