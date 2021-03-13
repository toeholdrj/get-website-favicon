'use strict'
const request = require('./request')
const cheerio = require('cheerio')
const {parse: urlParse} = require('url')

module.exports = async (url, options={}) => {
    let response = await request(url, options)
    let html = response.data
    let $ = cheerio.load(html, {
        lowerCaseTags: true,
        lowerCaseAttributeNames: true,
    })
    $.url = response.request.res.responseUrl
    $.baseUrl = urlParse($.url).protocol + '//' + urlParse($.url).hostname
    return $
}
