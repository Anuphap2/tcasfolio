// src/types/index.ts

import { z } from "zod";
import { infoSchema } from "@/schema/personal";

export type InfoFormData = z.infer<typeof infoSchema>;