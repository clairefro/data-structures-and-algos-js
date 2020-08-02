// Queue - follows FIFO principle

function createQueue() {
  const queue = [];
  return {
    enqueue(item) {
      queue.unshift(item);
    },
    dequeue() {
      return queue.pop();
    },
    peek() {
      return queue[queue.length - 1];
    },
    get length() {
      return queue.length;
    },
    isEmpty() {
      return queue.length === 0;
    },
    show() {
      return queue;
    }
  };
}

const q = createQueue();
console.log(q.isEmpty()); // => true

q.enqueue("Open cereal box");
q.enqueue("Pour cereal in bowl");
q.enqueue("Get milk");
q.enqueue("Pour milk over cereal");
q.enqueue("Eat cereal");
q.enqueue("Clean dish");

console.log(q.peek()); // => 'Open cereal box'

q.dequeue();
console.log(q.peek()); // => 'Pour cereal in bowl'
q.dequeue();
console.log(q.peek()); // => 'Get milk'
q.dequeue();
console.log(q.peek()); // => 'Pour milk over cereal'
q.dequeue();
console.log(q.peek()); // => 'Eat cereal'
q.dequeue();
console.log(q.peek()); // => 'Clean dish'
q.dequeue();
console.log(q.peek()); // => undefined
console.log(q.isEmpty()); // => true
