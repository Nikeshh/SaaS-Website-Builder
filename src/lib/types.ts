import { Prisma, Role, Notification, User, Lane, Ticket, Contact, Tag } from '@prisma/client'  
import Stripe from 'stripe'
import { _getTicketsWithAllRelations, getAuthUserDetails, getMedia, getPipelineDetails, getTicketsWithTags, getUserPermissions } from './queries'
import { db } from './db'
import { z } from 'zod'

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

export type AuthUserWithAgencySidebarOptionsSubAccounts = Prisma.PromiseReturnType<typeof getAuthUserDetails>

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<typeof getUserPermissions>

export type UsersWithAgencySubAccountPermissionsSidebarOptions = Prisma.PromiseReturnType<typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions>

const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
  agencyId: string
) => {
  return await db.user.findFirst({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  })
}

export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>

export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput

export type TicketWithTags = Prisma.PromiseReturnType<typeof getTicketsWithTags>

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/

export const TicketFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  value: z.string().refine((value) => currencyNumberRegex.test(value), {
    message: 'Value must be a valid price.',
  }),
})

export const CreatePipelineFormSchema = z.object({
  name: z.string().min(1),
})

export type UpsertFunnelPage = Prisma.FunnelPageCreateWithoutFunnelInput

export const LaneFormSchema = z.object({
  name: z.string().min(1),
})

export type LaneDetail = Lane & {
  Tickets: TicketAndTags[]
}

export type TicketAndTags = Ticket & {
  Tags: Tag[]
  Assigned: User | null
  Customer: Contact | null
}

export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<
  typeof getPipelineDetails
>