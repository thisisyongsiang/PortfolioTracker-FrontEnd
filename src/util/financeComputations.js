import { getUserOnePortfolio } from "../users/userApi"

export function computeOverallPortfolioNetReturn(portfolios, overallPfValue) {
    let totalSellCashflow = 0
    let totalBuyCashflow = 0
    let netReturn = 0

    portfolios.forEach((p) => {
        p.sell.forEach((s) => {
            totalSellCashflow = totalSellCashflow + (s.price*s.quantity)
        })

        p.buy.forEach((b) => {
            totalBuyCashflow = totalBuyCashflow + (b.price*b.quantity)
        })
    })

    netReturn = (totalSellCashflow - totalBuyCashflow + overallPfValue)/totalBuyCashflow * 100

    return netReturn
}

export function computeSinglePortfolioNetReturn(portfolio) {
    let totalSellCashflow = 0
    let totalBuyCashflow = 0
    let netReturn = 0

    portfolio.sell.forEach((s) => {
        totalSellCashflow = totalSellCashflow + (s.price*s.quantity)
    })

    portfolio.buy.forEach((b) => {
        totalBuyCashflow = totalBuyCashflow + (b.price*b.quantity)
    })

    // getUserOnePortfolio(email,portfolio)
}