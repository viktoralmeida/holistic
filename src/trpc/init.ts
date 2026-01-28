import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import config from "@payload-config";
import { getPayload } from 'payload';
import superjson from 'superjson';
import {headers as getHeaders} from 'next/headers';

// Define the context type
interface Context {
  userId: string;
  db: Awaited<ReturnType<typeof getPayload>>;
}

export const createTRPCContext = cache(async (): Promise<Context> => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  try {
    // Check if required environment variables are present
    if (!process.env.DATABASE_URI) {
      throw new Error('DATABASE_URI environment variable is not set');
    }
    if (!process.env.PAYLOAD_SECRET) {
      throw new Error('PAYLOAD_SECRET environment variable is not set');
    }

    const payload = await getPayload({ config });
    return { 
      userId: 'user_123',
      db: payload 
    };
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Database connection failed';
    if (error instanceof Error) {
      if (error.message.includes('DATABASE_URI')) {
        errorMessage = 'Database URI not configured. Please set DATABASE_URI in your .env.local file';
      } else if (error.message.includes('PAYLOAD_SECRET')) {
        errorMessage = 'Payload secret not configured. Please set PAYLOAD_SECRET in your .env.local file';
      } else if (error.message.includes('Topology is closed')) {
        errorMessage = 'Database connection lost. Please check your MongoDB connection and restart the server';
      } else {
        errorMessage = `Database error: ${error.message}`;
      }
    }
    
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: errorMessage,
    });
  }
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async({next, ctx})=>
  {
    return next({
      ctx
    })
  }
);

export const protectedProcedure = baseProcedure.use(async({ctx,next}) => {
  try {
    const headers = await getHeaders();
    const session = await ctx.db.auth({headers});

    if(!session.user){
      throw new TRPCError({
        code:"UNAUTHORIZED",
        message: "Not authenticated"
      });
    }

    return next ({
      ctx: {
        ...ctx,
        session,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      throw error;
    }
    console.error('Authentication error:', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Authentication failed',
    });
  }
})