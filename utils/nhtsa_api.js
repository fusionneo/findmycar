const axios = require('axios');

// Make a request for a user with a given ID
module.exports = {
  getRecalls: async (make, model, year) => {
    const response = await axios.get(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${year}`);
    return response.data;
  },

  getVehicleId: async (year, make, model) => {
    const response = await axios.get(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${model}`)
    return response.data;
  },


  getSafetyRatings: async (vehicleId) => {
    const response = await axios.get(`https://api.nhtsa.gov/SafetyRatings/VehicleId/${vehicleId}`)
      return response.data;
  }
}