import { getUserOnePortfolio } from "../users/userApi";

export function computeOverallPortfolioNetReturn(portfolios, overallPfValue) {
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

export function computeSinglePortfolioNetReturn(portfolio, pfValue) {
  let totalSellCashflow = 0;
  let totalBuyCashflow = 0;
  let netReturn = 0;
  if (portfolio && pfValue) {
    portfolio.sell.forEach((s) => {
      totalSellCashflow = totalSellCashflow + s.price * s.quantity;
    });

    portfolio.buy.forEach((b) => {
      totalBuyCashflow = totalBuyCashflow + b.price * b.quantity;
    });

    netReturn =
      ((totalSellCashflow - totalBuyCashflow + pfValue) / totalBuyCashflow) *
      100;
    return netReturn;
  }
  return 0;
}

export function computeOverallPortfolioPnL(portfolios, overallPfValue) {
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
