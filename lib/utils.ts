import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random number between 100000 and 199999.
 * This is used to generate a unique key for components that don't have a key.
 * @returns {string} A random number as a string.
 */
export const getRandomNumber = (): string => {
  return String(Math.round((Math.random() + 1) * 100000));
};


type AsyncFunc=(e:ChangeEvent<HTMLInputElement>,...rest:any)=>Promise<void>

/**
 * Debounces a function, so that it is only called after a certain amount of time
 * has passed since the last time it was called.
 *
 * @param {Function} func - the function to debounce
 * @param {number} delay - the amount of time to wait before calling the function
 * @returns {Function} - the debounced function
 */

export const debounce = (func:AsyncFunc, delay: number)=> {
  let timer: number;
  return async (e:ChangeEvent<HTMLInputElement>,...rest:any) => {
    // if (timer) {
    //   window.clearTimeout(timer);
    // }
    window.clearTimeout(timer);
    timer = window.setTimeout(async () => {
      await func(e,...rest);
    }, delay);
  };
};
