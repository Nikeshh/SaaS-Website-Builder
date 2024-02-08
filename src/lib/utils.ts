import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStripeOAuthLink(
  accountType: 'agency' | 'subaccount',
  state: string
) {
  return `https://connect.stripe.com/oauth/authorize?redirect_uri=${process.env.NEXT_PUBLIC_URL}${accountType}&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&state=${state}&response_type=code&scope=read_write`;
}

