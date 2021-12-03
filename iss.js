/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
// use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    const data = JSON.parse(body);
    const IP = data.ip;
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, IP);
  });
};

//fetchMyIP(callback); once you move to the callback in the index.js file, do not call function here!!



const fetchCoordsByIP = function(ip, callback) {
  
  request('https://api.freegeoip.app/json/?apikey=b87d2890-53ef-11ec-b0fc-03ad3434f610', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates of IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function(coordsObj, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passing times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const objectPass = JSON.parse(body);
    callback(null, objectPass.response);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
    callback(error, null);
    return;
    } else {
      fetchCoordsByIP (ip, (error, coordsObj) => {
        if (error) {
          callback(error, null);
          return;
        } else {
          fetchISSFlyOverTimes (coordsObj, (error, passTimes) => {
            if (error) {
              callback(error);
              return;
            } else {
              callback(null, passTimes);
              // for (let time of passTimes) {
              // // console.log(time.risetime, time.duration);
              // }
            }
          })
        }
      })  
    }
  })
};


module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};