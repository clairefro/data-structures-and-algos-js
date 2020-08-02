https://www.rithmschool.com/courses/javascript-computer-science-fundamentals/introduction-to-recursion

## What is recursion?

A recursive function is a function that calls itself. That sounds pretty crazy - why would we do this? Often, recursion is an alternative to iteration and in many cases it can actually be more elegant, resulting in less code that is more readable. However, it's essential to have what's called a base case in all recursive functions, as well as an understanding of the call stack. Let's examine these terms a bit more.

## Why use recursion?

Many times, recursion can solve the same problems as iteration, but in a more elegant way. Other times, recursion is far more useful when solving certain types of problems. Let's think about this problem:

Imagine we have an object and we're trying to figure out if a certain value exists in an object. We could easily loop through all the keys in the object and see if the value exists, but what happens when the value of a key is another object? What happens when we have something like this?

```
var obj = {
    data: {
        info: {
            innerData: {
                moreInfo: {
                    name: "Bob"
                }
            }
        }
    }
}
```

We would need to loop over the obj variable and the data, info, innerData and moreInfo keys! Instead of writing multiple loops, we could call our function again, but with a different parameter! This idea of invoking the same function again is recursion. With recursive functions, each recursive call is different (accepts different input).

## Always have a base case

The most important thing to have in any recursive function is a base case. A base case is a terminating case that ends the recursive calls. Without a base case, your recursive function will keep calling itself until you run out of memory. What this means is that you have too many functions on the call stack and your stack "overflows" (that's where the name StackOverflow comes from)!

Here's an example of a recursive function without a base case:

```
function thisIsAProblem() {
    thisIsAProblem();
}
```

If you invoke thisIsAProblem, the function will call itself. But this inner function will again call thisIsAProblem, which will again call thisIsAProblem, and so on. There's never any way for this function to stop calling itself, which means the call stack will just fill up with copies of thisIsAProblem, and none of these functions will be able to pop off the stack. Try pasting this code in the console; you should get a RangeError with the message Maximum call stack size exceeded.

## Visualize the call stack

When going through a recursive function, always do your best to visualize the call stack. The Chrome dev tools can help with this. Whenever you call a function again, think about how you are adding it to the stack. Finally, remember that the stack is a LIFO (Last In, First Out) data structure. The last function that is placed (pushed) on the stack will be the first one removed from (popped off) the stack.

## Getting Started

Let's take a look at a recursive function that won't throw a RangeError. We will call this function sumRange. It will take a number and return the sum of all numbers from 1 up to the number passed in. For example, sumRange(3) should return 6, since 1 + 2 + 3 = 6.

You know enough JavaScript to write this function iteratively, but let's try to take a recursive approach. In order to do that, we'll need to think about a couple of things:

The base case: how do we stop this function from overflowing the call stack?
How should we call the function from within itself? (We need to make sure we do something a bit different each time so that we don't overflow the stack.)
Let's take a look at one possible solution:

```
function sumRange(num){
   if(num === 1) return 1;
   return num + sumRange(num-1);
}
```

The base case here is the first line inside of the function; without it, the stack will overflow (try to answer for yourself why this is the case). Then, in the second line of the function, we're calling sumRange, but passing in num - 1. This is another hallmark of recursion: when we call the function again, we typically modify the parameters of the function in some way so that we can eventually reach the base case. In this example, if the second line read return num + sumRange(num), we'd once again overflow the stack (try to answer for yourself why this is the case, too).

To really understand what this function is doing, think about what's happening on the return num + sumRange(num-1); line. If you call sumRange(4), for instance, then this function will itself call sumRange(3) on this line, which will add another copy of sumRange to the call stack. Similarly, sumRange will call sumRange(2), which will add yet another copy of sumRange to the stack. This process will continue until we reach the base case, after which these functions will start popping off of the stack.

## Your Turn

Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1. Otherwise, return the result of the base multiplied by the power function to the exponent - 1. You can think of it in terms of this example:

2^4 = 2 _ 2^3;
2^3 = 2 _ 2^2;
2^2 = 2 _ 2^1;
2^1 = 2 _ 2^0; // once our exponent is 0 we KNOW that the value is always 1!
Here is what that looks like:

```
function power(base,exponent){
   if(exponent === 0) return 1;
   return base * power(base,exponent-1);
}
```

ext, try to write a function that returns the factorial of a number. As a quick refresher, a factorial of a number is the result of that number multiplied by the number before it, and the number before that number, and so on, until you reach 1. The factorial of 1 is just 1. For example:

factorial(5); // 5 _ 4 _ 3 _ 2 _ 1 === 120
Here is a possible solution:

```
function factorial(num){
  if(num === 1) return 1;
  return num * factorial(num-1);
}
```

## Scope in Recursion

To help with scope in recursion, we can create a wrapper or helper function which will be called multiple times in an outer function (to provide additional scope). This is done through a process called `helper method recursion`. Let's start by writing a function called all which accepts an array and a callback and returns true if every value in the array returns true when passed as parameter to the callback function. Here is an iterative solution:

Iterative Solution

```
function all(array, condition){
    for(var i = 0; i < array.length; i++){
        if(!(condition(array[i]))){
            return false;
        }
    }
    return true;
}

all([1,2,3,4], function(val){
    return val > 0;
}); // true

all(["1","2",3,"4"], function(val){
    return typeof val === 'string';
}); // false
```

Helper Method Recursion
Now let's see how we could tackle this problem using helper method recursion:

```
function allRecursive(array, condition) {
    var copy = array.slice();
    function allRecursiveHelper(arr, cb){
        if (arr.length === 0) return true;
        if (condition(arr[0])){
            arr.shift();
            return allRecursive(arr,condition);
        } else {
            return false;
        }
    }
    return allRecursiveHelper(copy, condition);
}

var numbersArray = [1,2,3,4,5];
allRecursive(numbersArray, function(v) {
    return v > 0;
});
```

Pure Recursion

```
function allRecursive(array, condition) {
    var copy = copy || array.slice();
    if (copy.length === 0) return true;
    if (condition(copy[0])){
        copy.shift();
        return allRecursive(copy,condition);
    } else {
        return false;
    }
}

var numbersArray = [1,2,3,4,5];
allRecursive(numbersArray, function(v) {
    return v > 0;
});
```
