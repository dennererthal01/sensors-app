export default function (theme, variable) {
    let value = theme[variable]
    while (value && value.startsWith('$')) {
        value = theme[value.substr(1)]
    }
    return value
}
