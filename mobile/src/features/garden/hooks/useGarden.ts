import { useQuery } from '@tanstack/react-query';

import { fetchGarden } from '../../../api/garden';
import { queryKeys } from '../../../api/queryKeys';

export function useGarden() {
  return useQuery({
    queryKey: queryKeys.garden,
    queryFn: fetchGarden,
  });
}
