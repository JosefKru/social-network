export const required = (value) => {
  if (value) return undefined

  return 'Обязательное поле'
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Максимальная длинна ${maxLength} символов`
  }

  return undefined
}
