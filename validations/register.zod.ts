import { z } from "zod";

export const registerValidation = z.array(z.object({}));
