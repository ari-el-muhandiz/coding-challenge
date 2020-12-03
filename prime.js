function checkPrime(input, factor=2) { 
    // best case
    if (input <= 2) {
        return input === 2 ? true : false;
    }
    if (factor >= input) {
        return true;
    }
    if (input % factor === 0) {
      return false
    } 
   
    return checkPrime(input, factor+1);
  }