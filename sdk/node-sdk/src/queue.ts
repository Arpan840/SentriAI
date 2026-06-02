const queue: any[] = [];

export function enqueue(event: any) {
  queue.push(event);

  console.log("QUEUE SIZE:", queue.length);
}

export function getBatch(size = 100) {
  return queue.splice(0, size);
}

export function removeBatch(size: number) {
  queue.splice(0, size);
}
