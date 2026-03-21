import BannerZoneClient from './BannerZoneClient';
import { getUpcomingEvents, DEALERS, PROMOS } from './bannerData';

export default function BannerZone() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <BannerZoneClient
      initialEvents={upcomingEvents}
      dealers={DEALERS}
      promos={PROMOS}
    />
  );
}
