'use strict'
const request = require('../request')
const {URL, parse:urlParse} = require('url')

module.exports =  async ($) => {
    let icons = []

    let href = $('link[rel="manifest" i]', 'head').attr('href')
    if(!href) return icons

    let url = new URL(href, $.url).href
    let response = await request(url)
    if (response.status == 200 && response.data && Array.isArray(response.data.icons)) {
        icons = response.data.icons.map(({src = '', sizes = '', type = ''}) => (
            {
                src: new URL(src, url).href,
                sizes,
                type,
                origin: url
            }
        ) || [])
    }
    return icons
}
