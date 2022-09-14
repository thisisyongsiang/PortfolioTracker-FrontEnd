const { xirr, convertRate } = require('node-irr')

export function computePortfolioNetReturn(portfolios, overallPfValue) {
  let totalSellCashflow = 0;
  let totalBuyCashflow = 0;
  let netReturn = 0;

  portfolios.forEach((p) => {
    p.sell.forEach((s) => {
      totalSellCashflow = totalSellCashflow + s.value;
    });

    p.buy.forEach((b) => {
      totalBuyCashflow = totalBuyCashflow + b.value;
    });

    if (p.cash) {
    p.cash.forEach((c) => {
      totalSellCashflow = totalSellCashflow + c.value
    })}
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
      ? (totalBuyCashflow += t.value)
      : (totalSellCashflow += t.value);
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
      totalSellCashflow = totalSellCashflow + s.value;
    });

    p.buy.forEach((b) => {
      totalBuyCashflow = totalBuyCashflow + b.value;
    });

    if (p.cash) {
    p.cash.forEach((c) => {
      totalSellCashflow = totalSellCashflow + c.value
    })}
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
      ? (totalBuyCashflow += t.value)
      : (totalSellCashflow += t.value);
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
          date: new Date(b.date),
        });
      });
  
      p.sell.forEach((s) => {
        cashflowAndTiming.push({
          amount: s.quantity * s.price,
          date: new Date(s.date),
        });
      });
      p.cash.forEach((c) => {
        if (c.type === "Dividend") {
          cashflowAndTiming.push({
            amount: c.value,
            date: new Date(c.date)
          })
        }
      })
    });
  
    cashflowAndTiming.push({
      amount: currentPfValue,
      date: new Date(),
    });
    if (cashflowAndTiming.length > 1) {
      let calc = xirr(cashflowAndTiming);
      return convertRate(calc.rate, "year") * 100;
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
    if (t.type && t.type === "buy") {
      cashflowAndTiming.push({
          amount: t.value * -1,
          date: new Date(t.date),
        })}
    else {
          cashflowAndTiming.push({
          amount: t.value,
          date: new Date(t.date),
        })}
  });

  cashflowAndTiming.push({
    amount: assetValue,
    date: new Date(),
  });
  if (cashflowAndTiming.length > 1) {
    let calc = xirr(cashflowAndTiming);
    return convertRate(calc.rate, "year") * 100;
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
