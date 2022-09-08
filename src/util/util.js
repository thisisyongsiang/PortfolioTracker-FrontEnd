export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const deBounce=(callbackFn,delay=250)=>{
    let timeout;
    return(...args)=>{
      clearTimeout(timeout);
      timeout=setTimeout(()=>{
        callbackFn(...args);
      },delay)
    }
  }