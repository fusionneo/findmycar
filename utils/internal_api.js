const axios = require('axios');

// Make a request for a user with a given ID
module.exports = {
    getCars: async (year, passengerCapacity, MSRP) => {
        const response = await axios.post(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${year}`);
        return response.data;
      },
}