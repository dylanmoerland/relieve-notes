// import { z } from "zod";
import { createRant } from "~/dto/createRant";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const rantRouter = createTRPCRouter({
  createRant: publicProcedure
  .input(createRant)
  .mutation(({ input, ctx }) => {
    return ctx.prisma.rant.create({ data: input });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.rant.findMany({ orderBy: [{ createdAt: 'desc' }] });
  }),
});
