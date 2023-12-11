export default function currencyFilter(value, currency = "RUB") {
  return new Intl.NumberFormat("ru-RU", {
    currency,
    style: "currency",
  }).format(value);
}
