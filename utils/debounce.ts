export default function debounce(fn: Function, ms: number) {
    let timer: any;
    return function(...args: any[]) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn(...args)
        timer = null;
      }, ms);
    }
  }