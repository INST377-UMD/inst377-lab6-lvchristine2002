// Initialize the map centered on the United States
const map = L.map('map').setView([37.8, -96], 4);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Generate random coordinates
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 random coordinates
const coordinates = [
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) }
];

// Loop through the coordinates, add markers, and fetch locality information
coordinates.forEach((coord, index) => {
  // Add marker to the map
  const marker = L.marker([coord.lat, coord.lng]).addTo(map);

  // Update the text for each marker
  document.getElementById(`lat${index + 1}`).textContent = coord.lat;
  document.getElementById(`lng${index + 1}`).textContent = coord.lng;

  // Fetch the locality using the provided API
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const locality = data.locality || 'Locality not found';
      document.getElementById(`locality${index + 1}`).textContent = locality;
    })
    .catch(error => {
      console.error('Error fetching locality:', error);
      document.getElementById(`locality${index + 1}`).textContent = 'Locality not available';
    });
});
