import axios from "axios";

const url = process.env.REACT_APP_APIURL;
const axiosInstance = axios.create({
  baseURL: url,
});
export function addUser(user) {
  return axiosInstance
    .post(url + "user/add", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      return res.data;
    })
    .catch((err) => {
      console.error("rejected post " + err);
      return null;
    });
}
export async function getAllUsers() {
  try {
    let response = await axios.get(url + "user/all");
    if (response.status === 200) return response.data;
    else {
      console.warn("wrong status: " + response.data);
      return [];
    }
  } catch (error) {
    console.error("some error with request :" + error);
    return [];
  }
}
export function getUser(email) {
  return axios
    .get(url + "user/select", {
      params: { email: email },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      if (res.data.length > 0) return res.data[0];
      else return null;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
export function getUserPortfolios(email) {
  return axios
    .get(url + "portfolio/select", {
      params: { email: email },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      return res.data;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
export function getUserPortfolioNames(email) {
  return axios
    .get(url + "portfolio/select/name", {
      params: { email: email },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
export function getUserOverallPortfolioValue(email) {
  return axios
    .get(url + "portfolio/overallValue", {
      params: { email: email },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      return res.data.value;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
export function getUserOnePortfolio(email, portfolioName) {
  return axios
    .get(url + "portfolio/selectone", {
      params: { email: email, portfolioName: portfolioName },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      return res.data;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
export function getOneUserPortfolioValue(email, portfolioName) {
  return axios
    .get(url + "portfolio/selectonevalue", {
      params: { email: email, portfolioName: portfolioName },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      return res.data.value;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
export function getUserPortfolioHistoricalValue(
  email,
  portfolioName,
  startDate,
  endDate
) {
  return axios
    .get(url + "portfolio/selectonevalue/timeperiod", {
      params: {
        email: email,
        portfolioName: portfolioName,
        startDate: startDate,
        endDate: endDate,
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return [];
      }
      return res.data;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return null;
    });
}
