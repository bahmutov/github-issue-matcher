var la = require('lazy-ass');
var check = require('check-more-types');
var R = require('ramda');

var noop = R.always();

describe('matching issues', function () {
  var matcher = require('./issue-matcher');

  var issues = [{
    number: 10,
    title: 'foo is wrong',
    body: 'foo seems to have wrong value'
  }, {
    number: 11,
    title: 'bar is wrong',
    body: 'bar is foo'
  }];

  it('is a funciton', function () {
    la(check.fn(matcher), matcher);
  });

  it('returns a promise', function () {
    var result = matcher([], {});
    la(check.promise(result), result);
    return result.catch(noop);
  });

  it('finds issue by title string', function () {
    var issue = {
      title: 'foo is wrong',
      body: 'blah blah blah'
    };
    var result = matcher(issues, issue);
    la(check.promise(result), result);
    return result.then(function (foundIssue) {
      la(foundIssue, 'could not find an issue', foundIssue);
      la(foundIssue === issues[0],
        'found the right issue', foundIssue);
    }, function (err) {
      la(false, 'got an error', err);
    });
  });
});
