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
export function addUserPortfolio(email,portfolioName,buy=[],sell=[]) {
  let pf={emailAddress:email,
    portfolio: portfolioName,
    buy:buy,
    sell: sell
  }
  return axiosInstance
    .post(url + "portfolio/add", pf, {
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
export function deleteUserPortfolio(email,portfolioName) {

  return axiosInstance
    .delete(url + "portfolio/del", {
      params:{     
        email :email,
        portfolioName :portfolioName}
      })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return null;
      }
      return res.data;
    })
    .catch((err) => {
      console.error("deletion fail " + err);
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
        return [];
      }
      if (!res.data)return [];
      return res.data;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return [];
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
        return [];
      }
      return res.data;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return [];
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
        return 0;
      }
      return res.data.value;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return 0;
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
export function addUserPortfolioTransaction(email,portfolioName,transactionType,transaction) {
  let body={
    emailAddress:email,
    portfolio:portfolioName,
    transactionType:transactionType,
    transaction:transaction
  }
  console.log(body);
  return axiosInstance
    .put(url + "portfolio/transaction/update", body, {
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
      console.error("rejected update " + err);
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
        return 0;
      }
      return res.data.value;
    })
    .catch((err) => {
      console.error("some error with request :" + err);
      return 0;
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
      return [];
    });
}
export function getUserOverallPortfolioHistoricalValue(
  email,
  startDate,
  endDate
) {

  return axios
    .get(url + "portfolio/overallValue/timeperiod", {
      params: {
        email: email,
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
      return [];
    });
}

export function getUserPortfolioAssets(
  email,
  portfolioName
) {
  return axios
    .get(url + "portfolio/selectone/assets", {
      params: {
        email: email,
        portfolioName: portfolioName,
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

export function getUserPortfolioAllAssetTableStats(
  email,
  portfolioName
) {
  return axios
  .get(url + "portfolio/selectone/allassettablestats", {
    params: {
      email: email,
      portfolioName: portfolioName
    }
  })
  .then((res) => {
    if (res.status !== 200) {
      console.warn("wrong status: " + res.data)
      return []
    }
    return res.data
  })
  .catch((err) => {
    console.error("some error with request: " + err)
  })
}

export function getUserPortfolioAssetsTransactions(
  email,
  portfolioName,
  assetSymbol,
) {
  return axios
    .get(url + "portfolio/selectone/asset/transactions", {
      params: {
        email: email,
        portfolioName: portfolioName,
        assetSymbol:assetSymbol
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

export function getUserPortfolioOneAssetValue(
  email,
  portfolioName,
  assetSymbol){
    return axios.get(url+"portfolio/selectone/asset/value",{
      params:{
        email: email,
        portfolioName: portfolioName,
        assetSymbol:assetSymbol,
      }
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


export function getUserPortfolioOneAssetHistoricalValue(
  email,
  portfolioName,
  assetSymbol,       
  startDate,
  endDate,
) {
  return axios
    .get(url + "portfolio/selectoneasset/timeperiod", {
      params: {
        email: email,
        portfolioName: portfolioName,
        assetSymbol:assetSymbol,
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