export const arrToJson = (arr, option = { child: "children", key: 'value', value: 'label' }, json = {}) => {
  const { child, key, value } = { child: "children", key: 'value', value: 'label', ...option }
  for (let i in arr) {
    const el = arr[i]
    if (el[child]) {
      json[el[key]] = el[value]
      arrToJson(el[child], option, json)
    } else {
      json[el[key]] = el[value]
    }
  }
  return json
}