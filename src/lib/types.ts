import {
    Prisma, Role, Notification
} from '@prisma/client'
  
import Stripe from 'stripe'
import { _getTicketsWithAllRelations } from './queries'
  
export type TicketDetails = Prisma.PromiseReturnType<typeof _getTicketsWithAllRelations>
  
export type PricesList = Stripe.ApiList<Stripe.Price>

export type NotificationWithUser =
  | ({
      User: {
        id: string
        name: string
        avatarUrl: string
        email: string
        createdAt: Date
        updatedAt: Date
        role: Role
        agencyId: string | null
      }
    } & Notification)[]
  | undefined