module.exports = (language) => {
    let lang = ''
    if(language) lang = language
    else lang = 'en'
    const config = require(`../langs/${lang}.js`)
    return config
}