import { z } from "zod";

export const createRant = z.object({ title: z.string(), content: z.string() });