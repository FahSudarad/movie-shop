//api fetching data
import axios from "axios";
const API_BASE_URL = "https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=a";

export async function fetchAllMovie() {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
      throw error;
    }
  }