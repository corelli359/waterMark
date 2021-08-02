var api = function (url) {
    return fetch(url).then(function (res) { return res.json(); });
};
api("/seals");
