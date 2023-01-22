exports.smartTrim = (str, len, delim, appendix) => {
    if(str.length <= len) return str

    var trimedStr = str.substr(0, len + delim.length)
    var lastDelimIndex = trimedStr.lastIndexOf(delim)

    if(lastDelimIndex >= 0) trimedStr = trimedStr.substr(0, lastDelimIndex)

    if(trimedStr) trimedStr += appendix

    return trimedStr
}