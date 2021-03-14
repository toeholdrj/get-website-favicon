'use strict'

const {URL, parse: urlParse} = require('url')
const getdom = require('./getdom')
const rank = require('./rank')
const iconByFile = require('./origin/file')
const iconByHtml = require('./origin/html')
const iconByManifest = require('./origin/manifest')
const iconByDeep = require('./origin/deep')

module.exports = async (url, options={}) => {
    let icons = []

    if (!url) throw new Error("No url given")
    if (!urlParse(url).protocol) url = `http://${url}`

    let $
    try {
        $ = await getdom(url)
    } catch (err) {
        throw new Error(`Failed to fetch icons for ${url}`)
    }
    let icons_html = iconByHtml($)
    let icons_manifest = await iconByManifest($)
    let icons_file = await iconByFile($.baseUrl)
    let icons_deep = await iconByDeep(url)

    icons = icons.concat(icons_html, icons_manifest, icons_file, icons_deep)
    for (let i in icons) icons[i].rank = rank(icons[i])
    icons.sort((a, b) => (b.rank - a.rank))

    return {
        url: $.url,
        baseUrl: $.baseUrl,
        originUrl: url,
        icons
    }
}
