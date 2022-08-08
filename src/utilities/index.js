"use stricts"

module.exports.toMoney = (money, currency) => {
    money = Math.floor(money);
    return (
      (currency ? currency : '') +
      (!money
        ? '0'
        : money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')) +
      ''
    );
  }