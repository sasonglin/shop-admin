import dataFormat from './data-format.js'

export default {
  install (Vue, option) {
    Vue.filter('dataFormat', dataFormat)
  }
}
