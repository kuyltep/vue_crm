import store from "@/store";

export default function dateFilter(date) {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const locale = store.getters.info.locale || "ru-RU";
  return new Intl.DateTimeFormat(locale, options).format(date);
}
