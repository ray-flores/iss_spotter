const { nextISSTimesForMyLocation } = require('./iss_promised');
// const { printPassTimes } = require('./index');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next Pass at ${datetime} for ${duration} seconds!`);
  }
};

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((data) => {
//     const { response } = JSON.parse(data);
//     return response;
//   });
  
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })