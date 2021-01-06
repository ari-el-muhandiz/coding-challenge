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

console.log(sawSequence([1, 2, 1, 3, 2]))
console.log(sawSequence([9, 8, 7, 6, 5]))
console.log(sawSequence([10, 10, 10, 10]))
console.log(sawSequence([-14, -10, -20, -8, -10, 3, 2, 5, 5, 4]))
