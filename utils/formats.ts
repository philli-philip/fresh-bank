export function renderAmount(
  cent: number,
  currency: string,
  locale?: string,
  showCurreny?: boolean,
) {
  const formatter = new Intl.NumberFormat(locale ?? "de-DE", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: currency,
    currencyDisplay: showCurreny ?? true ? "code" : undefined,
  });

  return formatter.format(cent);
}

export function renderAmountWithoutCurrency(
  cent: number,
  locale?: string,
) {
  const formatter = new Intl.NumberFormat(locale ?? "de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
  });
  return formatter.format(cent);
}
