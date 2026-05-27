import { useState, useEffect } from 'react';
import { StravaActivity } from '@/lib/types';

export function useActivities(page = 1, perPage = 30) {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/strava/activities?page=${page}&per_page=${perPage}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then(data => {
        setActivities(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, perPage]);

  return { activities, loading, error };
}
