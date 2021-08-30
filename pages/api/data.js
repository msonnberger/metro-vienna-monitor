export default async function handler(req, res) {
  const { stopId1, stopId2 } = req.query;
  try {
    const monitor1 = await getMonitor(stopId1);
    const monitor2 = await getMonitor(stopId2);
    const resData = [monitor1, monitor2];
    res.status(200).json(resData);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function getMonitor(stopId) {
  const url = `https://www.wienerlinien.at/ogd_realtime/monitor?stopId=${stopId}`;
  const data = await fetch(url);
  const raw = await data.json();
  const lines = raw.data.monitors['0'].lines;
  const monitor = {};
  monitor.platform = lines['0'].platform;
  monitor.towards = Array(2).fill(lines['0'].towards.trim());

  if (monitor.towards[0].includes('NO DEPARTURE PLATFORM')) {
    monitor.towards[0] = 'NICHT EINSTEIGEN !';
    monitor.towards[1] = 'NO DEPARTURE';
  }

  const departure = lines['0'].departures.departure;

  if (!isEmpty(departure[0].departureTime)) {
    monitor.countdown = [
      departure['0'].departureTime.countdown,
      departure['1'].departureTime.countdown,
    ];
  }

  return monitor;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
