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

export function computeAnnualisedReturns(portfolios, currentPfValue) {
  let cashflowAndTiming = [];
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
    return 0
}
