import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function messageRoom(room: string, message: string) {
  console.log(`Message to ${room}: ${message}`);
}