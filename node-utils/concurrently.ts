export function concurrently(
  list: Array<() => Promise<void>>,
  n: number | undefined = 5
) {
  let tail = list.splice(n);
  let head = list;
  let resolved: any[] = [];
  let processed = 0;
  return new Promise((resolve) => {
    head.forEach((x) => {
      let res = x();
      resolved.push(res);
      res.then((y: any) => {
        runNext();
        return y;
      });
    });
    function runNext() {
      if (processed == tail.length) {
        resolve(Promise.all(resolved));
      } else {
        resolved.push(
          tail[processed]().then((x: any) => {
            runNext();
            return x;
          })
        );
        processed++;
      }
    }
  });
}
