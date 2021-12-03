
// const { fetchMyIP } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   } else {
//     console.log("It worked!", ip);
//   }
// });

// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('198.48.241.105', (error, data) => {
//   if (error) {
//     console.log("No directions!", error);
//   } else {
//     console.log("You're at:", data);
//   }
// });

// const { fetchISSFlyOverTimes } = require('./iss');

//test coords
// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data2) => {
//   if (error) {
//     console.log("Something went wrong!", error);
//   } else {
//     console.log("Your pass times are:", data2);
//   }
// });

//UNCOMMENT TO RESUME FUNCTIONS!
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  } 
  console.log('Yay!');
  printPassTimes(passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next Pass at ${datetime} for ${duration} seconds!`);
  }
};

// module.exports = { printPassTimes };