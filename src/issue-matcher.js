var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');
var R = require('ramda');

function matcher(existingIssues, issue) {
  la(check.array(existingIssues), 'expected list of issues', existingIssues);
  la(check.object(issue), 'expected new issue', issue);

  var found = R.find(R.propEq('title', issue.title), existingIssues);
  if (!found) {
    return Promise.reject();
  }
  return Promise.resolve(found);
}

module.exports = matcher;
