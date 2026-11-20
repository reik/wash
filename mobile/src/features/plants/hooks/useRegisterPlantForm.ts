import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { createPlant } from '../../../api/plants';
import { ensureProfile } from '../../../api/profiles';
import { registerPlantSchema, type RegisterPlantFormValues } from '../schemas';
import { deviceTzBand } from '../timeBand';

function deviceTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function useRegisterPlantForm(ownerId: string) {
  const { i18n } = useTranslation();
  const form = useForm<RegisterPlantFormValues>({
    resolver: zodResolver(registerPlantSchema),
    defaultValues: { name: '', stage: 'newborn', city: '', countryCode: '', climateClass: 'temperate' },
  });

  const register = useMutation({
    mutationFn: async (values: RegisterPlantFormValues) => {
      const tzBand = deviceTzBand();
      await ensureProfile({
        id: ownerId,
        nickname: `owner-${ownerId.slice(0, 6)}`,
        locale: i18n.language === 'ja' ? 'ja' : 'en',
        tz: deviceTimeZone(),
        tzBand,
      });
      return createPlant({
        ownerId,
        name: values.name,
        stage: values.stage,
        city: values.city,
        countryCode: values.countryCode.toUpperCase(),
        tzBand,
        climateClass: values.climateClass,
      });
    },
  });

  const submit = form.handleSubmit((values) => register.mutate(values));

  return { form, submit, register };
}
