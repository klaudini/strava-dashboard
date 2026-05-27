# StravaBoard

Dashboard para visualizar entrenamientos de Strava con Next.js 14, TypeScript y Tailwind CSS.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode)
- **NextAuth.js** con provider OAuth 2.0 de Strava
- **Recharts** para graficos de actividad y ritmo
- **date-fns** para formateo de fechas

## Funcionalidades

- Autenticacion con Strava via OAuth 2.0
- Dashboard con estadisticas del año (km, tiempo, desnivel)
- Grafico de kilometros semanales (ultimas 12 semanas)
- Grafico de evolucion de ritmo (ultimas 30 carreras)
- Lista completa de actividades con filtro por carreras
- Records personales por distancia (1K, 5K, 10K, media maraton, maraton)
- Graficos de progreso mensual y tendencia de ritmo
- Refresco automatico del access token de Strava

## Configuracion

### 1. Crear la aplicacion en Strava

1. Ve a [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Crea una nueva aplicacion con los siguientes datos:
   - **Application Name**: StravaBoard (o el nombre que prefieras)
   - **Category**: Data Importer
   - **Authorization Callback Domain**: `localhost` (para desarrollo)
3. Anota el **Client ID** y el **Client Secret**

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<genera con: openssl rand -hex 32>

STRAVA_CLIENT_ID=<tu client id de Strava>
STRAVA_CLIENT_SECRET=<tu client secret de Strava>
```

Generar `NEXTAUTH_SECRET`:

```bash
openssl rand -hex 32
```

### 3. Instalar dependencias y arrancar

```bash
npm install
npm run dev
```

La aplicacion estara disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
strava-dashboard/
├── app/
│   ├── layout.tsx                  # Root layout con providers
│   ├── page.tsx                    # Landing / login page
│   ├── providers.tsx               # SessionProvider wrapper
│   ├── dashboard/
│   │   ├── layout.tsx              # Layout con sidebar
│   │   └── page.tsx               # Dashboard principal
│   ├── activities/
│   │   ├── layout.tsx
│   │   └── page.tsx               # Lista de actividades
│   ├── records/
│   │   ├── layout.tsx
│   │   └── page.tsx               # Personal Records
│   ├── progress/
│   │   ├── layout.tsx
│   │   └── page.tsx               # Progreso en el tiempo
│   └── api/
│       ├── auth/[...nextauth]/
│       │   └── route.ts           # NextAuth handler
│       └── strava/
│           ├── activities/route.ts
│           └── stats/route.ts
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── WeeklyChart.tsx
│   │   ├── RecentActivities.tsx
│   │   └── PaceChart.tsx
│   ├── activities/
│   │   ├── ActivityCard.tsx
│   │   └── ActivityList.tsx
│   ├── records/
│   │   └── PRCard.tsx
│   ├── progress/
│   │   ├── MonthlyProgressChart.tsx
│   │   └── PaceTrendChart.tsx
│   └── ui/
│       ├── Badge.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── strava.ts                  # Strava API client
│   ├── utils.ts                   # Helpers: formatPace, formatDistance, formatTime
│   └── types.ts                   # TypeScript types
├── hooks/
│   ├── useActivities.ts
│   └── useStats.ts
├── types/
│   └── next-auth.d.ts             # Tipos extendidos de NextAuth
└── .env.example
```

## Deploy en produccion

Para produccion (Vercel, Railway, etc.), cambia:

- `NEXTAUTH_URL` a tu dominio real
- En la app de Strava, agrega tu dominio en **Authorization Callback Domain**

## Licencia

MIT
