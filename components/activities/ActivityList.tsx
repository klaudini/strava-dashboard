import { StravaActivity } from '@/lib/types';
import ActivityCard from './ActivityCard';

interface Props {
  activities: StravaActivity[];
}

export default function ActivityList({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-500">No hay actividades para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
