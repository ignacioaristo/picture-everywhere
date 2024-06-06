export const getLocation = async (lat, long) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCkoK2Tsd8SPNU01NJZXVtWus5Qwg4Fcqk`,
  )
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${Config.GOOGLE_API_KEY}`,
    // )
    .then(res => res.json())
    .catch(err => console.log('Error: ', err));

  return response;
};
