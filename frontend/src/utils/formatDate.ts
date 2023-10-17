export const formatDate = (
  date: string,
  config?: Intl.DateTimeFormatOptions
) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};
