import axios from "axios";

const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        "role": "admin",
        // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYwNDQ5MTNiZmU2Y2JiYjViMDk0ZCIsImlhdCI6MTcyNjczMTg0NH0.CWyRGqQegPWNX-eVlqk9CM5u2s1x-4XNnAfJJBe8Pr0"
    }
});

export default axiosConfig;