import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { createRant } from "~/dto/createRant";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type RouterOutputs } from "~/utils/api";

interface RantEvents {
  rant: (data: RouterOutputs["rant"]["getAll"][number]) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof RantEvents>(event: TEv, listener: RantEvents[TEv]): this;
  off<TEv extends keyof RantEvents>(event: TEv, listener: RantEvents[TEv]): this;
  once<TEv extends keyof RantEvents>(event: TEv, listener: RantEvents[TEv]): this;
  emit<TEv extends keyof RantEvents>(
    event: TEv,
    ...args: Parameters<RantEvents[TEv]>
  ): boolean;
}


class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

export const rantRouter = createTRPCRouter({
  createRant: publicProcedure
  .input(createRant)
  .mutation(async ({ input, ctx }) => {
    console.log('hellooo');
    const authorId = ctx.userId;
  
    if (!authorId) throw new TRPCError({ code: 'UNAUTHORIZED' });
  
    const result = await ctx.prisma.rant.create({ data: {
      ...input,
      authorId,
    } });
console.log('emit: ', result)
    ee.emit(`rant`, result);

    return result;
  }),
  onRant: publicProcedure.subscription(({ ctx }) => {
    const userId = ctx.userId;
    
    if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
    
    return observable((emit) => {
      const onRant = (data: unknown) => {
        console.log('receive: ', data)
        emit.next(data);
      }
      ee.on(`rant`, onRant);
      return () => {
        ee.off(`rant`, onRant);
      }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {  
    if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return ctx.prisma.rant.findMany({ where: { authorId: ctx.userId }, orderBy: [{ createdAt: 'desc' }] });
  }),
});
