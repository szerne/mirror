'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newsService = undefined;

var _constants = require('constants');

var ARTICLES_URL = '//newsapi.org/v1/articles';
var SOURCES_URL = '//newsapi.org/v1/sources';
var defaultSrc = 'cnn';

var newsService = exports.newsService = function () {
    var carouselIntervalId = void 0;
    var refreshIntervalId = void 0;
    var category = '';
    var source = defaultSrc;
    var articles = [];
    var allSources = null;
    var page = 0;
    var sourcesPerPage = 12;

    var getArticles = function getArticles(onSuccess) {
        var xhr = new XMLHttpRequest();
        var url = ARTICLES_URL + '?source=' + source + '&apiKey=' + _constants.CONSTANTS.NEWS_API_KEY;
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var res = JSON.parse(xhr.responseText);
                articles = res.articles;
                if (onSuccess) onSuccess(articles);
            }
        };
        xhr.send();
    };

    var getSources = function getSources(onSuccess) {
        if (newsService.allSources) return onSuccess(getNPageSources(0));

        var xhr = new XMLHttpRequest();
        var url = SOURCES_URL + '?category=' + newsService.category + '&country=us&language=en';
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var res = JSON.parse(xhr.responseText);
                newsService.allSources = res.sources;
                onSuccess(getNPageSources(0));
            }
        };
        xhr.send();
    };

    var getNPageSources = function getNPageSources(n) {
        return newsService.allSources.slice(n * sourcesPerPage, (n + 1) * sourcesPerPage);
    };

    var getNextPageSources = function getNextPageSources() {
        if (!newsService.allSources) return;
        page = sourcesPerPage * (page + 1) <= newsService.allSources.length ? page + 1 : 0;
        return getNPageSources(page);
    };

    var getArticleEveryNSeconds = function getArticleEveryNSeconds(seconds, callback) {
        var articleIndex = 0;
        callback(articles[articleIndex]);
        articleIndex = articleIndex < articles.length ? articleIndex + 1 : 0;
        carouselIntervalId = setInterval(function () {
            callback(articles[articleIndex]);
            articleIndex = !!articles[articleIndex + 1] ? articleIndex + 1 : 0;
        }, seconds * 1000);
    };

    var subscribe = function subscribe(seconds, refreshMinutes, callback) {
        newsService.getArticles(function () {
            getArticleEveryNSeconds(seconds, callback);
        });

        refreshIntervalId = setInterval(getArticles, refreshMinutes * 60000);
    };

    var guessSourceIdByName = function guessSourceIdByName(name) {
        var source = newsService.allSources.find(function (s) {
            return s.name.toLowerCase() === name.toLowerCase();
        });

        if (source) return source.id;
    };

    var changeSource = function changeSource(name, onChange) {
        if (!Array.isArray(newsService.allSources) || !newsService.allSources.length) {
            newsService.getSources(function () {
                source = guessSourceIdByName(name) || source;
                onChange(source);
            });
        } else {
            source = guessSourceIdByName(name) || source;
            onChange(source);
        }
    };

    var unsubscribe = function unsubscribe() {
        window.clearInterval(carouselIntervalId);
        window.clearInterval(refreshIntervalId);
    };

    return {
        allSources: allSources,
        category: category,
        changeSource: changeSource,
        getArticles: getArticles,
        getArticleEveryNSeconds: getArticleEveryNSeconds,
        getSources: getSources,
        getNextPageSources: getNextPageSources,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
}();
//# sourceMappingURL=newsService.js.map
