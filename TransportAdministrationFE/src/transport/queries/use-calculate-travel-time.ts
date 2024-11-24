import { useMutation } from '@tanstack/react-query';
import CalculateTravelTimeRequest from '../dto/CalculateTravelTimeRequest';
import transportClient from '../services/transport-client';

const useCalculateTravelTime = () => {
  return useMutation({
    mutationFn: (body: CalculateTravelTimeRequest) => transportClient.calculateTravelTime(body).then((res) => res.data),
  });
};

export default useCalculateTravelTime;
