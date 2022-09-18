import axios from "axios";

const url = process.env.REACT_APP_APIURL;

export function addUser(user) {
  
  return axios
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
export function addUserPortfolio(email,portfolioName,buy=[],sell=[],cash=[]) {
  let pf={emailAddress:email,
    portfolio: portfolioName,
    buy:buy,
    sell: sell,
    cash:cash
  }
  return axios
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

  return axios
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
export function editUserPortfolioName(email,portfolioName,newName) {
  let pf={email:email,
    portfolioName: portfolioName,
    newName:newName,
  }
  return axios
    .put(url + "portfolio/edit", pf, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("Unable to update");
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.error("rejected post " + err);
      return false;
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
  return axios
    .put(url + "portfolio/transaction/update", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.error("rejected update " + err);
      return false;
    });
}
export function deleteUserPortfolioTransaction(email,portfolioName,transactionType,transaction) {
  let body={
    emailAddress:email,
    portfolio:portfolioName,
    transactionType:transactionType,
    transaction:transaction
  }
  return axios
    .put(url+"portfolio/transaction/del",body,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        console.warn("wrong status: " + res.data);
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.error("rejected delete " + err);
      return false;
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
  endDate,
  interval="1d"
) {
  return axios
    .get(url + "portfolio/selectonevalue/timeperiod", {
      params: {
        email: email,
        portfolioName: portfolioName,
        startDate: startDate,
        endDate: endDate,
        interval:interval
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
  endDate,
  interval="1d"
) {

  return axios
    .get(url + "portfolio/overallValue/timeperiod", {
      params: {
        email: email,
        startDate: startDate,
        endDate: endDate,
        interval:interval
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
  export function deleteUserPortfolioOneAsset(
    email,
    portfolioName,
    assetSymbol){
      console.log(portfolioName);
      console.log(assetSymbol);
      return axios.delete(url+"portfolio/selectone/assets/delete",{
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
  interval="1d"
) {
  return axios
    .get(url + "portfolio/selectoneasset/timeperiod", {
      params: {
        email: email,
        portfolioName: portfolioName,
        assetSymbol:assetSymbol,
        startDate: startDate,
        endDate: endDate,
        interval:interval
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