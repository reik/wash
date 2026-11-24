import { useMutation } from '@tanstack/react-query';

import { logPlantEvent, type OwnerEventType } from '../../../api/events';

export function useLogEvent(plantId: string) {
  return useMutation({
    mutationFn: (type: OwnerEventType) => logPlantEvent({ plantId, type }),
  });
}
