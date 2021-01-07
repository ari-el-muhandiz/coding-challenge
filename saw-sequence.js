var start = new Date().getTime();

function sawSequence(number) {
    // best case
    if (number.length === 0 || number.length === 1) {
        return 0
    }
    
    if (number.length === 2 && ( number[0] > number[1] || number[1] > number[0])) {
        return 1
    }
    
    let sawCount = 0;
    for (let i = 0; i < number.length; i++) {
        let prev = number[i];
        let pattern = '-';
        for (let j = (i + 1); j < number.length; j++) {
            if (number[j] > prev && (pattern === 'down' || pattern === '-')) {
                pattern = 'up'
                sawCount += 1;
            } else if (number[j] < prev && (pattern === 'up' || pattern === '-')) {
                pattern = 'down'
                sawCount += 1;
            } else {
                break;
            }
            prev = number[j]
        }
    }
    return sawCount
}

function sawSequenceImprove(number) {
    // best case
    if (number.length === 0 || number.length === 1) {
        return 0
    }
    
    if (number.length === 2 && ( number[0] > number[1] || number[1] > number[0])) {
        return 1
    }
    
    let sawCount = 0;
    if (number[0] > number[1] || number[1] > number[0]) {
        sawCount = 1;
    }
    let count = 0;
    let isLastConsArr = false;
    let startIndex = 0;
    for (let i = 2; i < number.length; i++) {
      // check sequence /\ and \/
      if (
          (i - 2) >= 0 && 
          ((number[i - 2] < number[i - 1] && number[i - 1] > number[i]) ||
          (number[i - 2] > number[i - 1] && number[i - 1] < number[i]))
        ) {
        count += (2 + startIndex);
        const isDown = number[i - 1] > number[i];
        //checking last condition
        if (number[i] === number[i + 1] || 
            (isDown && number[i] > number[i+1]) || 
            (!isDown && number[i] < number[i+1]) || 
            (i + 1 === number.length)) {
            isLastConsArr = true
        }
        startIndex += 1
      }
      else if (number[i - 1] > number[i] || number[i - 1] < number[i]) {
          sawCount += 1
          count = 0
      }
      
      if (isLastConsArr) {
        sawCount += count
        isLastConsArr = false
        startIndex = 0
      }
    }
    return sawCount
}

console.log(sawSequence([-14, -10, -20, -8, -10, 3, 2, 5, 5, 4, 6, 2, 3]))
console.log(sawSequenceImprove([-14, -10, -20, -8, -10, 3, 2, 5, 5, 4, 6, 2, 3]))
console.log(sawSequenceImprove([1, 2, 1, 3, 2]))
console.log(sawSequenceImprove([9, 8, 7, 6, 5]))
console.log(sawSequenceImprove([-14, -10, -20, -8, -10, 3, 2, 5, 5, 4]))

var end = new Date().getTime();

console.log("Call to doSomething took " + (end - start) + " milliseconds.")