'use strict'
const {URL} = require('url')
const cheerio = require('cheerio')
const selectors = [
    "link[rel='icon' i][href]",
    "link[rel='shortcut icon' i][href]",
    "link[rel='apple-touch-icon' i][href]",
    "link[rel='apple-touch-icon-precomposed' i][href]",
    "link[rel='apple-touch-startup-image' i][href]",
    "link[rel='mask-icon' i][href]",
    "link[rel='fluid-icon' i][href]",
    "meta[name='msapplication-TileImage' i][content]"
]

module.exports = ($) => {
    const icons = []
    $(selectors.join()).each(function(_i, el) {
        let {href = '', sizes = '', type = '', content = ''} = el.attribs
        let src = ''
        if (el.name == 'link') {
            src = href
        } else {
            src = content
        }
        if (src && src !== '#') {
            icons.push({
                src: new URL(src, $.url).href,
                sizes,
                type,
                origin: cheerio.html(el)
            })
        }
    })
    return icons
}
