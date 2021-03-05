# -*- coding: utf-8 -*-
def postfix(expr):
    stack = []
    operator = {'+', '-', '*', '/'}
    chars = expr.split(',')
    for char in chars:
        if char.isdigit():
            stack.append(char)
        elif char in operator:
            num2 = stack.pop()
            num1 = stack.pop()
            stack.append(str(int(eval(num1+char+num2))))
    return int(stack.pop())
    

if __name__ == '__main__':
    print(postfix('9,4,2,+,*,6,14,7,/,+,*'))