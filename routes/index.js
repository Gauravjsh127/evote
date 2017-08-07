/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index.html', {title: 'index'});
};

exports.login = function (req, res) {
    res.render('login.html', {title: 'login'});
};
exports.Dashboard = function (req, res) {
    res.render('Dashboard.html', {title: 'Dashboard'});
};

exports.SetGoals = function (req, res) {
    res.render('SetGoals.html', {title: 'SetGoals'});
};


exports.result = function (req, res) {
    res.render('result.html', {title: 'result'});
};

exports.risktolerance = function (req, res) {
    res.render('risktolerance.html', {title: 'risktolerance'});
};