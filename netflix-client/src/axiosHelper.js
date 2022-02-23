import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
//since we are exporting this thing as default so this name doesnt matter hile importing i.e
//we can import this instance from other file as "import abcedfg from 'axiosHelper'"";
// or we can say import axios from "axiosHelper"; basically we can import by ay name;
