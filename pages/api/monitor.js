export default async function handler(req, res) {
  const { stopId1, stopId2 } = req.query;
  const monitor1 = await getMonitor(stopId1);
  const monitor2 = await getMonitor(stopId2);
  const resData = [monitor1, monitor2];
  res.status(200).json(resData);
}

async function getMonitor(stopId) {
  const url = `https://www.wienerlinien.at/ogd_realtime/monitor?stopId=${stopId}`;
  const data = await fetch(url);
  const raw = await data.json();
  const lines = raw.data.monitors['0'].lines;
  const monitor = {};
  monitor.line = lines['0'].name;
  monitor.towards = lines['0'].towards.trim();
  const departure = lines['0'].departures.departure;
  monitor.countdown = [
    departure['0'].departureTime.countdown,
    departure['1'].departureTime.countdown,
  ];

  return monitor;
}
