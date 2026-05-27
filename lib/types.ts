export interface StravaActivity {
  id: number;
  name: string;
  distance: number;          // metros
  moving_time: number;       // segundos
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  average_speed: number;     // m/s
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  average_cadence?: number;
  suffer_score?: number;
  kudos_count: number;
  achievement_count: number;
  map?: {
    summary_polyline: string;
  };
}

export interface AthleteStats {
  recent_run_totals: PeriodStats;
  ytd_run_totals: PeriodStats;
  all_run_totals: PeriodStats;
}

export interface PeriodStats {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface PersonalRecord {
  distance: string;
  time: number;              // segundos
  activity_id?: number;
  date?: string;
}
