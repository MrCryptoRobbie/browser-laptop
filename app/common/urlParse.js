/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const LRUCache = require('lru-cache')
const config = require('../../js/constants/config')

let urlParse = require('url').parse
let cachedUrlParse = new LRUCache(config.cache.urlParse)

module.exports = (url) => {
  let parsedUrl = cachedUrlParse.get(url)
  if (parsedUrl == null) {
    parsedUrl = urlParse(url)
    cachedUrlParse.set(url, parsedUrl)
  }

  // make a copy so we don't alter the cached object with any changes
  return Object.assign({}, parsedUrl)
}
