

class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty(){
    return this.heap.length === 0;
  }

  swap(idx1, idx2) {
    const tmp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = tmp;
  }

  peek() {
    return this.heap[0];
  }

  insert(element) {
    this.heap.push(element);

    let idx = this.heap.length - 1;

    while (idx !== 0 && this.heap[idx][0] < this.heap[this.parent(idx)][0]) {
      this.swap(idx, this.parent(idx));
      idx = this.parent(idx);
    }
  }

  extractMin() {
    //remove ele from the front of the heap
    const root = this.heap.shift();

    //put the last element to the front of the heap and remove the last element from the
    //heap as it is now sitting at the front of the heap
    this.heap.unshift(this.heap[this.heap.length-1]);
    this.heap.pop();

    this.heapify(0);
    return root;
  }

  heapify(idx) {
    let left = this.leftChild(idx);
    let right = this.rightChild(idx);
    let biggest = idx;

    //if left node is bigger than the current node
    if (left < this.heap.length && this.heap[biggest][0] > this.heap[left][0]) {
      biggest = left;
    }

    //if the right child is bigger than the curr node
    if (right < this.heap.length && this.heap[biggest][0] > this.heap[right][0]) {
      biggest = right;
    }

    //if the value of the smallest has changed, then swap
    if (biggest != idx) {
      this.swap(biggest, idx);
      this.heapify(biggest);
    }
  }

  leftChild = index => index * 2 + 1;
  rightChild = index => index * 2 + 2;
  parent = index => Math.floor((index - 1) / 2);
}



export { MinHeap }