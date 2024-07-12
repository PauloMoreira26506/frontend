import axios from 'axios';
import authHeader from "./auth.header";

const fetchData = async (url, setData) => {
  try {
    const response = await axios.get(url, { headers: authHeader()});
    if (response.data.success) {
      setData(response.data.data);
    } else {
      throw new Error("Error Web Service");
    }
  } catch (error) {
    console.log(error.message + " " + url);
  }
};

export default fetchData;
