export const RegexValidators = {
  alphaNumeric: /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+)$/,
  alphaNumericV2: /^([a-zA-Z0-9]+)$/,
  alpha: /^([a-zA-ZñÑ ]+)$/,
  alphaAccentuation: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+)$/,
  numeric: /^(\d+)$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/,
}
