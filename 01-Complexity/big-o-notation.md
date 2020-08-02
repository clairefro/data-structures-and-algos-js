https://www.rithmschool.com/courses/javascript-computer-science-fundamentals/introduction-to-big-o-notation

To get started with Big O notation, it is useful to understand what is important and what is not. There are a couple of rules with the notation to remember:

1. Constants are ignored
2. Smaller components are ignored
   Keeping those rules in mind, the following are equivalent:

O(500 * n) --> O(n)
O(99999999999) --> O(1)
O(10*n2 + 5n + 20) --> O(n2)
O(n * n) --> O(n2)
O(n*log(n) + 30000 _ n) --> O(n _ log(n))
Notice that in all examples, constant values are replaced with 1, and all smaller components that are added are ignored.

## O(1)

The following functions are O(1) or constant time because the algorithm is not dependent on a variable size data set. In other words, regardless of the input size, the runtime of the algorithm will not grow beyond some constant size. (In many cases, it will be roughly the same regardless of the input).

```
function add(num1, num2, num3) {
   return num1 + num2 + num3;
}
```

In the above example, add requires two addition operations. The size of the numbers doesn't affect how many additions need to be performed, so in this case the runtime isn't dependent on the size of the inputs.

```
function sayHello() {
    for (var i = 0; i < 100; i++) {
       console.log("Hello");
    }
}
```

sayHello logs a message to the console 100 times whenever it is called. This function is also O(1); it doesn't even have any inputs!

```
function logMultiples(num) {
    for (var i = 0; i < 10; i++) {
        console.log(i * num);
    }
}
```

The logMultiples function logs the first ten multiples of the input to the console. Regardless of the size of num, however, only the first ten multiples will ever be logged. In other words, the runtime once again does not depend on the size of the input, and this function is also O(1).

## O(n)

The following algorithms are O(n), or linear time, because the data set is iterated over approximately one time:

```
function sayHello(numberOfTimes) {
    for (var i = 0; i < numberOfTimes; i++) {
        console.log("Hello");
    }
}
```

Unlike our previous sayHello function, this one takes an argument, which controls how many times Hello gets logged to the console. In this case, the runtime of the function should be roughly proportional to the size of numberOfTimes. For example, it should take roughly ten times as long to log Hello 1,000 times as it does to log Hello 100 times. Setting numberOfTimes equal to n, the size of the input, this means that the runtime of sayHello is O(n).

```
function doubleThenTriple(numbers) {
    var doubled = numbers.map(function(num) {
        return num * 2;
    });

    return doubled.map(function(num) {
        return num * 3;
    });
}
```

In the above example we map over the data set twice. So you could say the runtime is O(n + n) or O(2*n). However, in big O notation, constants are ignored. So, O(2*n) is equivalent to O(n). What matters is that the runtime scales in proportion to the input size, not the details of the proportional relationship.

## O(n2)

```
function allPairs(arr) {
    var pairs = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }

    return pairs;
}
```

```
function bubbleSort(arr) {
  var len = arr.length;
  var lastSwap;
  var temp
  while (len != 0) {
    lastSwap = 0;
    for (var i = 1; i < len; i++) {
      if (arr[i - 1] > arr[i]) {
        // Swap the two elements
        temp = arr[i-1];
        arr[i-1] = arr[i];
        arr[i] = temp;
        lastSwap = i;
      }
    }
    len = lastSwap;
  }
}
```

In these two examples, within each element of the array, we are iterating over all elements again. Therefore, the runtime is O(n \* n) or O(n2).

It's a helpful rule of thumb that in general, if you see nested loops, the runtime will be O(nlevels of nesting). In other words, a function with a single for loop will be O(n), a function with a loop inside of a loop will be O(n2), a function with a loop inside of a loop inside of a loop will be O(n3), and so on. However, this rule of thumb doesn't always hold, as the following examples show:

```
function logMultiples(n) {
    for (var num1 = 1; num1 <= n; num1++) {
        for (var num2 = 1; num2 <= n; num2++) {
            console.log(num1 * num2);
        }
    }
}

function logSomeMultiples(n) {
    for (var num1 = 1; num1 < n=; num1++) {
        for (var num2 = 1; num2 <= Math.min(n, 10); num2++) {
            console.log(num1 * num2);
        }
    }
}
```

The first function, `logMultiples`, is O(n2). When `n` is 1, the function logs 1 multiple; when `n` is 2, the function logs 4 multiples; when `n` is 3, the function logs 9 multiples, and so on.

What about the second function, `logSomeMultiples`? It might seem like this function should be O(n2) as well, because of the inner loop. However, the runtime of the inner loop is not proportional to n! The inner loop will run a maximum of 10 times, so it is actually an O(1) operation. This means that the outer loop, which is still O(n), performs an O(1) operation for each value of `num1`. Therefore, `logSomeMultiples` is itself O(n), not O(n2).

Common runtimes in order of least to greatest
-O(1)
-O(log(n))
-O(n)
-O(n\*log(n))
-O(n2)

# Across Time and Space

So far we've only been talking about the runtime of different algorithms using Big O Notation. This is often referred to as analyzing the `time complexity` of the algorithm.

But Big O isn't just used to talk about the time it takes our programs to run; it's also used to talk about how much space (i.e. memory) our program requires. This is often referred to as analyzing the `space complexity` of the algorithm.

Very often we're concerned primarily with `auxiliary space complexity`, that is, how much additional memory does the algorithm require beyond what needs to be allocated for the inputs themselves?

Let's look at a couple of examples:

Let's look at a couple of examples:

```
function total(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}
```

In this example, total takes one input, which is an array. Let's let n denote the length of the array. Note that the time complexity of total is O(n), since we're looping through the array once and adding to the total. However, the space complexity is just O(1), since we only require one additional unit of space, for the number stored in total.
