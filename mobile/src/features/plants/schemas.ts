import { z } from 'zod';

import { ClimateClassSchema, PlantStageSchema } from '../../api/plants';

export const registerPlantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: 'validation.nameRequired' })
    .max(40, { error: 'validation.nameTooLong' }),
  stage: PlantStageSchema,
  city: z.string().trim().min(1, { error: 'validation.cityRequired' }),
  countryCode: z.string().trim().regex(/^[A-Za-z]{2}$/, { error: 'validation.countryInvalid' }),
  climateClass: ClimateClassSchema,
});

export type RegisterPlantFormValues = z.infer<typeof registerPlantSchema>;
