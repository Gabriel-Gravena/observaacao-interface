const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
})

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
})

export function formatDateTime(value: string | Date) {
  return dateTimeFormatter.format(new Date(value))
}

export function formatDate(value: string | Date) {
  return dateFormatter.format(new Date(value))
}
