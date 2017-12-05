var HtmlReporter = require('nightwatch-html-reporter');
var path = require('path');

var reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: path.resolve(__dirname, '../reports')
});

module.exports = {
  write : function(results, options, done) {
    reporter.fn(results, done);
  }
};