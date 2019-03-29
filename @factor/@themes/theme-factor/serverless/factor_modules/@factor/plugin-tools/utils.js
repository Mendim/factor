module.exports.default = Factor => {
  return new class {
    constructor() {}

    // Parse to standard utility lists
    // Ideal for passing around config data and lists (inputs, etc.. )
    parseList(list = [], options = {}) {
      let { suffix = "", prefix = "" } = options

      if (!Array.isArray(list)) {
        return []
      }

      const wrap = text => {
        const _ = []
        if (suffix) _.push(suffix)
        _.push(this.toLabel(text))
        if (prefix) _.push(prefix)
        return _.join(" ")
      }
      suffix = suffix ? " " + suffix : ""

      return list.map(_ => {
        if (typeof _ == "string" || typeof i == "number") {
          return {
            value: _,
            name: wrap(_),
            desc: ""
          }
        } else if (typeof _ == "object") {
          const { name, value } = _
          if (!name && value) {
            _.name = wrap(_)
          } else if (typeof value == "undefined" && name) {
            _.value = this.slugify(name)
          }
          return _
        } else {
          return false
        }
      })
    }

    slugify(text) {
      if (!text) {
        return text
      }

      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/^\d+/g, "") // Remove Numbers
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text
    }

    toLabel(str) {
      if (!str || typeof str !== "string") {
        return str
      }
      let label = this.camelToKebab(str)
        .replace(new RegExp("-|_", "g"), " ")
        .replace(/\b\w/g, l => l.toUpperCase())

      return this.stopWordLowercase(label)
    }

    camelToKebab(string) {
      if (!string) {
        return string
      } else {
        return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
      }
    }

    stopWordLowercase(str) {
      const stopwords = require("stopwords").english

      const regex = new RegExp("\\b(" + stopwords.join("|") + ")\\b", "gi")
      return str.replace(regex, match => {
        return match.toLowerCase()
      })
    }
  }()
}
