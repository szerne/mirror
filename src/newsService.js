import { CONSTANTS } from 'constants';

const ARTICLES_URL = '//newsapi.org/v1/articles';
const SOURCES_URL = '//newsapi.org/v1/sources';
const defaultSrc = 'cnn';

export const newsService = (() => {
    let carouselIntervalId;
    let refreshIntervalId;
    let category = '';
    let source = defaultSrc;
    let articles = [];
    let allSources = null;
    let page = 0;
    let sourcesPerPage = 12;

    const getArticles = (onSuccess) => {
        let xhr = new XMLHttpRequest();
        let url = `${ARTICLES_URL}?source=${source}&apiKey=${CONSTANTS.NEWS_API_KEY}`;
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                articles = res.articles;
                if (onSuccess) onSuccess(articles);
            }
        };
        xhr.send();
    }

    const getSources = (onSuccess) => {
        if (newsService.allSources) return onSuccess(getNPageSources(0));

        let xhr = new XMLHttpRequest();
        let url = `${SOURCES_URL}?category=${newsService.category}&country=us&language=en`;
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                newsService.allSources = res.sources;
                onSuccess(getNPageSources(0));
            }
        };
        xhr.send();
    }

    const getNPageSources = (n) => {
        return newsService.allSources.slice(n * sourcesPerPage, (n + 1) * sourcesPerPage);
    }

    const getNextPageSources = () => {
        if (!newsService.allSources) return;
        page = sourcesPerPage * (page + 1) <= newsService.allSources.length ? page + 1 : 0;
        return getNPageSources(page);
    }

    const getArticleEveryNSeconds = (seconds, callback) => {
        let articleIndex = 0;
        callback(articles[articleIndex]);
        articleIndex = articleIndex < articles.length ? articleIndex + 1 : 0;
        carouselIntervalId = setInterval(() => {
            callback(articles[articleIndex]);
            articleIndex = !!articles[articleIndex + 1] ? articleIndex + 1 : 0;
        }, seconds * 1000);
    }

    const subscribe = (seconds, refreshMinutes, callback) => {
        newsService.getArticles(() => {
            getArticleEveryNSeconds(seconds, callback);
        });

        refreshIntervalId = setInterval(getArticles, refreshMinutes * 60000);
    }

    const guessSourceIdByName = (name) => {
        let source = newsService.allSources.find((s) => {
            return s.name.toLowerCase() === name.toLowerCase();
        });

        if (source) return source.id;
    }

    const changeSource = (name, onChange) => {
        if (!Array.isArray(newsService.allSources) || !newsService.allSources.length) {
            newsService.getSources(() => {
                source = guessSourceIdByName(name) || source;
                onChange(source)
            })
        } else {
            source = guessSourceIdByName(name) || source;
            onChange(source);
        }
    }

    const unsubscribe = () => {
        window.clearInterval(carouselIntervalId);
        window.clearInterval(refreshIntervalId);
    }

    return { 
        allSources, 
        category, 
        changeSource,
        getArticles, 
        getArticleEveryNSeconds, 
        getSources, 
        getNextPageSources,
        subscribe,
        unsubscribe
    }

})();