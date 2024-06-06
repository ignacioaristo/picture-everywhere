export const getLocation = async (lat: number, long: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_API_KEY}`,
  )
    .then(res => res.json())
    .catch(err => console.log('Error: ', err));

  return response;
};
