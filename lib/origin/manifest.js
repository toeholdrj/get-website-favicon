'use strict'
const request = require('../request')
const {URL, parse:urlParse} = require('url')

module.exports =  async ($) => {
    let href = $('link[rel="manifest" i]', 'head').attr('href')
    if(!href) return []

    let url = new URL(href, $.url).href

    try {
        let response = await request(url)
    } catch (err) {
        return []
    }

    let icons = []

    if ((response.status == 200) && response.data && Array.isArray(response.data.icons)) {
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
