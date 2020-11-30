/*
Write a program to check the bracket balancing in a string of brackets like “{([)]}”
*/


function getBracketType(input) {
    switch (input) {
        case '[':
        case ']':
            return 'square';
        case '{':
        case '}':
            return 'curly';
        case '<':
        case '>':
            return 'angle';
        default:
            return 'round';
    }
}

function balanceCheck(input) {
    const stack = [];
    const brackets = '()[]{}<>';
    const chars = input.split('');
    let isBalance = true;
    for (let index = 0; index < chars.length; index++) {
        const element = chars[index];
        const indexBracket = brackets.indexOf(element)
        // if even push to stack
        if (indexBracket % 2 === 0) {
            stack.push(getBracketType(element));
        } else {
            const lastBracketIndex = stack.pop();
            if (lastBracketIndex !== getBracketType(element)) {
                isBalance = false;
                break;
            }
        }

    }


    return isBalance;
}

console.log(balanceCheck("{[()]}"));
console.log(balanceCheck("{([)]}"));
console.log(balanceCheck("{()[]}"));
console.log(balanceCheck("{()[}"));
