/**
 * @flow
 * Replace BBCode formatting to HTML equivalent.
 */
module.exports = (text: string): string => {
  return text
    // BBcodes
    .replace(/(\[b\](.+?)\[\/b])/g, '<strong>$2</strong>')
    .replace(/\[size=10\]\[color=red\](.+?)\[\/color\]\[\/size\]/g, '')
    .replace(/\[size=10\]\[color=red\](.+?)\[\/size\]\[\/color\]/g, '')
    .replace(/\[size=18px\](.+?)\[\/size\]/g, '<strong>$1</strong>')
    .replace(/(\[url=(.+?)\])(.+?)(\[\/url\])/g, '<a href="$2" target="_blank">$3</a>')
    .replace(/(\[url\])(.+?)(\[\/url\])/g, '<a href="$2" target="_blank">$2</a>')
    .replace(/\[list\](.+?)\[\/list\]/g, '<ul>$1</ul>')
    .replace(/\[list=a\](.+?)\[\/list\]/g, '<ul>$1</ul>')
    .replace(/\[\*\](.+?)<br>/g, '<li>$1</li>')
}
