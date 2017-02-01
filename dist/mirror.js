'use strict';

require('../node_modules/jquery.qrcode/jquery.qrcode.min');

var _location = require('location');

var _weather = require('weather');

var _greeting = require('greeting');

var _voiceService = require('voiceService');

var _clock = require('clock');

var _newsService = require('newsService');

var clockComponent = $('#clock');
var mainMessageComponent = $('#greeting');

/********* WEATHER *********/
var degreeChar = String.fromCharCode(176);

var createForecastHour = function createForecastHour(forecast) {
    var el = '<div class="forecast hour">' + forecast.hour + '</div>' + ('<img class="forecast icon" src="' + forecast.icon + '" />') + '<div class="forecast temp">' + ('<span>' + forecast.temp + '</span>') + ('<span class="degree">' + degreeChar + '</span>') + '</div>';
    return el;
};

var onForecastReady = function onForecastReady(forecast) {
    var table = $('.hourly-forecast');
    table.empty();
    forecast.hourly.forEach(function (h) {
        var td = $('<td>' + createForecastHour(h) + '</td>');
        table.append(td);
    });
};

var onConditionsReady = function onConditionsReady(conditions) {
    var targetEl = $('.current-temp');
    var conditionsEl = $('<h5>' + conditions.location + '</h5>' + ('<h1>' + conditions.temp + degreeChar + '</h1>') + ('<p>' + conditions.weather + '</p>') + ('<img src="' + conditions.icon + '"/>'));
    targetEl.empty();
    targetEl.append(conditionsEl);
};

var location = new _location.Location();
location.getCoords(function (coords) {
    _weather.weatherService.subscribe('forecast', 900000, coords, onForecastReady);
    _weather.weatherService.subscribe('conditions', 1800000, coords, onConditionsReady);
});

/********* GREETING *********/
var setGreeting = function setGreeting() {
    mainMessageComponent.text(_greeting.greetingService.getCompliment());
};
setGreeting();

/********* CLOCK *********/
_clock.clock.init(function (now) {
    clockComponent.text(now.time);
});

/********* NEWS FEED *********/
var newsTargetEl = $('#news-feed');
var showingArticles = true;

var renderQrCode = function renderQrCode(article) {
    $('#qrcode').empty();
    $('#qrcode').qrcode({
        text: article.url,
        background: '#FFFFFF',
        foreground: '#000000',
        height: 100,
        width: 100
    });
};

var renderNewsArticle = function renderNewsArticle(article) {
    if (!showingArticles) return;

    newsTargetEl.empty();
    var articleEl = $('<div class="row">' + ('<img class="thumbnail three columns" src="' + article.urlToImage + '" onerror="this.src=\'images/day/unknown.png\'"/>') + '<div class="seven columns">' + ('<h5>' + article.title + '</h3>') + ('<p>' + article.description + '</p>') + '</div>' + '<div id="qrcode" class="two columns"></div>' + '</div>');
    newsTargetEl.append(articleEl);
    renderQrCode(article);
};

var getNewsSourceEl = function getNewsSourceEl(source) {
    return $('<div class="three columns news-source">' + ('' + source.name) + '</div>');
};

var renderNewsSourcesPage = function renderNewsSourcesPage(sources) {
    newsTargetEl.empty();
    sources.forEach(function (s) {
        newsTargetEl.append(getNewsSourceEl(s));
    });
};

var getNewsSources = function getNewsSources() {
    showingArticles = false;
    _newsService.newsService.unsubscribe();
    _newsService.newsService.getSources(renderNewsSourcesPage);
};

var getNext = function getNext() {
    var sources = _newsService.newsService.getNextPageSources();
    renderNewsSourcesPage(sources);
};

var returnToNews = function returnToNews() {
    if (showingArticles) return;
    showingArticles = true;
    _newsService.newsService.unsubscribe();
    _newsService.newsService.subscribe(45, 45, renderNewsArticle);
};

var getNewsFrom = function getNewsFrom(source) {
    showingArticles = true;
    _newsService.newsService.unsubscribe();
    _newsService.newsService.changeSource(source, function () {
        _newsService.newsService.subscribe(45, 45, renderNewsArticle);
    });
};

_newsService.newsService.subscribe(45, 45, renderNewsArticle);

/********* VOICE *********/
var commandsEl = $('<ul></ul>');

var showCommands = function showCommands() {
    mainMessageComponent.empty();
    _voiceService.voiceService.getTriggers().forEach(function (com) {
        if (com === 'Show me commands') return;
        commandsEl.append('<li class="command">' + com + '</li>');
    });
    mainMessageComponent.append(commandsEl);
    setTimeout(setGreeting, 20000);
};

_voiceService.voiceService.whenSaid('Show me commands', showCommands).whenSaid('How do I look', setGreeting).whenSaid('Show me news sources', getNewsSources).whenSaid('Show me next', getNext).whenSaid('Show me the news', returnToNews).whenSaid('Show me news from *source', getNewsFrom).start();
//# sourceMappingURL=mirror.js.map
