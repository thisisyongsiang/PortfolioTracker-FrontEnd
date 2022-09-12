var xirr = require("xirr");

export function computePortfolioNetReturn(portfolios, overallPfValue) {
  let totalSellCashflow = 0;
  let totalBuyCashflow = 0;
  let netReturn = 0;

  portfolios.forEach((p) => {
    p.sell.forEach((s) => {
      totalSellCashflow = totalSellCashflow + s.price * s.quantity;
    });

    p.buy.forEach((b) => {
      totalBuyCashflow = totalBuyCashflow + b.price * b.quantity;
    });
  });

  netReturn =
    ((totalSellCashflow - totalBuyCashflow + overallPfValue) /
      totalBuyCashflow) *
    100;

  return netReturn;
}

export function computeAssetNetReturn(transactions, assetValue) {
  let totalSellCashflow = 0;
  let totalBuyCashflow = 0;
  let netReturn = 0;

  transactions.forEach((t) => {
    t.type && t.type === "buy"
      ? (totalBuyCashflow += t.price * t.quantity)
      : (totalSellCashflow += t.price * t.quantity);
  });
  netReturn =
    ((totalSellCashflow - totalBuyCashflow + assetValue) / totalBuyCashflow) *
    100;
  return netReturn;
}

export function computePortfolioPnL(portfolios, overallPfValue) {
  let totalSellCashflow = 0;
  let totalBuyCashflow = 0;
  let overallPnL = 0;

  portfolios.forEach((p) => {
    p.sell.forEach((s) => {
      totalSellCashflow = totalSellCashflow + s.price * s.quantity;
    });

    p.buy.forEach((b) => {
      totalBuyCashflow = totalBuyCashflow + b.price * b.quantity;
    });
  });

  overallPnL = totalSellCashflow - totalBuyCashflow + overallPfValue;

  return overallPnL;
}

export function computeAssetPnL(transactions, assetValue) {
  let totalSellCashflow = 0;
  let totalBuyCashflow = 0;
  let netPnL = 0;

  transactions.forEach((t) => {
    t.type && t.type === "buy"
      ? (totalBuyCashflow += t.price * t.quantity)
      : (totalSellCashflow += t.price * t.quantity);
  });
  netPnL = totalSellCashflow - totalBuyCashflow + assetValue;
  return netPnL;
}

export function computePortfolioAnnualisedReturns(portfolios, currentPfValue) {
  let cashflowAndTiming = [];
  try {
    portfolios.forEach((p) => {
      p.buy.forEach((b) => {
        cashflowAndTiming.push({
          amount: b.quantity * b.price * -1,
          when: new Date(b.date),
        });
      });
  
      p.sell.forEach((s) => {
        cashflowAndTiming.push({
          amount: s.quantity * s.price,
          when: new Date(s.date),
        });
      });
    });
  
    cashflowAndTiming.push({
      amount: currentPfValue,
      when: new Date(),
    });
    if (cashflowAndTiming.length > 1) {
      let rate = xirr(cashflowAndTiming);
      return rate * 100;
    }
    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }

}

export function computeAssetAnnualisedReturns(transactions, assetValue) {
  let cashflowAndTiming = [];
try {
  transactions.forEach((t) => {
    t.type && t.type === "buy"
      ? cashflowAndTiming.push({
          amount: t.quantity * t.price * -1,
          when: new Date(t.date),
        })
      : cashflowAndTiming.push({
          amount: t.quantity * t.price,
          when: new Date(t.date),
        });
  });

  cashflowAndTiming.push({
    amount: assetValue,
    when: new Date(),
  });
  if (cashflowAndTiming.length > 1) {
    let rate = xirr(cashflowAndTiming);
    return rate * 100;
  }
  return 0;
} catch (error) {
  console.error(error);
  return 0;
}

}

export function computeVolatility(portfoliosHistory) {
  try {
    let portfoliosHistoryValues = [];
    let porfolioHistoryPercentageChange = [];
  
    if (portfoliosHistory.length > 0) {
      portfoliosHistory.forEach((item) => {
        const { value } = item;
        portfoliosHistoryValues.push(value);
      });
  
      portfoliosHistoryValues.forEach((curr, idx, portfoliosHistoryValues) =>
        idx
          ? porfolioHistoryPercentageChange.push(
              ((curr - portfoliosHistoryValues[idx - 1]) /
                portfoliosHistoryValues[idx - 1]) *
                100
            )
          : porfolioHistoryPercentageChange.push(curr - 0 / curr)
      );
      porfolioHistoryPercentageChange.shift();
  
      const n = porfolioHistoryPercentageChange.length;
  
      const mean = porfolioHistoryPercentageChange.reduce((a, b) => a + b, 0) / n;
  
      const deviation = porfolioHistoryPercentageChange.reduce(
        (dev, val) => dev + (val - mean) * (val - mean),
        0
      );
  
      return Math.sqrt(deviation / n);
    }
  
    return 0; 
  } catch (error) {
    console.error(error);
    return 0;
  }
  
}
