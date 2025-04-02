import {PrismaClient} from '@prisma/client'

// Add this to tell ESLint to ignore the next declaration
/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined
}
/* eslint-enable no-var */

export const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client