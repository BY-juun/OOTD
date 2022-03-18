import axios from "axios";

export const getWeatherData = async (latitude: string | string[] | undefined, longitude: string | string[] | undefined) => {
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};
