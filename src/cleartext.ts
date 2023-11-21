export function getRandomCleartext(): string {
  return texts[Math.floor(Math.random() * texts.length)];
}

const texts = [
  "Das Mädchen Leonie Kioschis ist Schülerin der fünften Klasse des Grimmelshausen-Gymnasiums in Gelnhausen.",
  "Pauline aus der Familie Kioschis geht gerne zum Kunst-Unterricht und hat daran große Freude.",
  "Tabea Jardas liebt es, Harry Potter zu lesen, und kann damit viele Stunden verbringen.",
  "Der kleine Junge Timon Jardas geht in den Kindergarten Traumwald in Niedergründau. Seine liebste Erzieherin ist Saskia.",
  "Frau Jessica Kioschis ist eine sehr gute und erfolgreiche Mediatorin und Coach und wird bald mehr Geld verdienen, als sie ausgeben kann.",
  "Der sexy Philipp Jardas hat keine Ahnung, wie wundervoll er ist, was wahrscheinlich auch gut ist, sonst wäre er vielleicht schon weg.",
  "Gelnhausen besteht neben dem Stadtkern (Stadtteil Mitte) aus den Stadtteilen Hailer, Haitz mit Kaltenborn, Höchst, Meerholz und Roth.",
  "Das Spiel Mario-Kart für die Nintendo Switch macht mit vier Spielern besonders viel Spaß.",
];
