import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getRandomNumber=()=>{
  return String(Math.round((Math.random() + 1) * 100000))
}