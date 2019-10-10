function getLocation(){
  return new Promise((resolve, reject) => {
    // Check geo location support.
    if(!(navigator.geolocation && navigator.geolocation.getCurrentPosition)){
      reject('No geo location support');
    }

    // Make geo location call.
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    );
  });
}

document.getElementById('location-update').addEventListener('click', function(event){
  event.preventDefault();

  const output = document.getElementById('location-output');

  output.innerText = `Loading location...`;

  getLocation()
    .then(response => {

      output.innerText = `Your location is:\n`;

      for(var key in response){
        output.innerText += `${key}: ${response[key]}\n`;
      }
    })
    .catch(error => console.error(error));
});