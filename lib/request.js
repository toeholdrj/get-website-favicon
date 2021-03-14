'use strict'
const axios = require('axios')

axios.defaults.headers = {
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36'
}
axios.defaults.maxRedirects = 5
axios.defaults.timeout = 3000

module.exports = axios.request
