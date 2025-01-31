// ==UserScript==
// @name            Tape Operator and Search
// @namespace       tape-operator
// @author          Kirlovon&KittenWoof
// @description     Watch movies on IMDB, TMDB, Kinopoisk and Letterboxd!
// @version         3.3.0
// @icon            https://github.com/Kirlovon/Tape-Operator/raw/main/assets/favicon.png
// @updateURL       https://github.com/Kirlovsdonon/Tape-Operator/raw/main/userscript/tape-operator2.user.js
// @downloadURL     https://github.com/Kirlovosd/Tape-Operator/raw/main/userscript/tape-operator2.user.js
// @run-at          document-idle
// @grant           GM.info
// @grant           GM.setValue
// @grant           GM.getValue
// @grant           GM.openInTab
// @grant           GM.deleteValue
// @grant           GM_xmlhttpRequest
// @connect         imdb.com
// @connect         letterboxd.com
// @match           *://localhost:3000/*
// @match           *://*.imdb.com/title/*
// @match           *://www.themoviedb.org/movie/*
// @match           *://www.themoviedb.org/tv/*
// @match           *://tapeop.dev/*
// ==/UserScript==


(function () {
    // Current version of the script
    const VERSION = GM.info?.script?.version;

    // Banner image
	  const BANNER_IMAGE = 'data:image/webp;base64,UklGRi4WAABXRUJQVlA4WAoAAAAQAAAAfwAA/wEAQUxQSG8AAAABHyAQIFMSpDoQEUELxm3bSMpr2t1Wpt153evIFSSi/wrTtmHcoV9m+T/lfwVB5X/fcGvdNWKYRnTXg+nB88HywfGH4Q+uACugSqASZgIygZgCTMkFpAIyEYkILUQKUWKEmL8GPw1eLR4tribNrQMAVlA4IJgVAACQYQCdASqAAAACAAAAJaWlkyDsGYrEgxXXSH8W4JUAUf+3KY/f2e/0lbx9U31iBV+Of778SP1C9ifQt7f9bv2S/oH4B4J/pOtS97/Fn9t/79+AfvB/FX0d/gvut+wD4If5V/QfxV/cH+5fhHDbW+/If5j+QH+f/8P+o+sWdPkAfy7+Y/3H8cP4b89/8n/jeYZ979Qz+Q/2D+1/1X9jP3/+7P7qv7b+0P9a+L39F+4H9u/bf6CP4j/Ev6b/SP2o/un/3/43MG/oX9/55Jn/sJ3Hl23IPE1+UHEMB2grtysoE5JjP5sirJyZXPPtFDbtqnjtdBTJZa5XDUfO6kg7L1rAWJwCLssbvDG6CQXapeiY64si/A9bDTZmR/erGYR1My+LAD4KkVX4+PMjfNMAO1jCzFLcWJ9Q5H1osDkfDtIoxY6C2JvjzR577RKJ/vHv0c/S9vks03B9hdtCUn0Uorj6IonI2TLhCnEFLFV/tg35Yy/fPHZY4DCQM/8RIwTM8xEdRelcmBQuGhgrXtbRB09Fr+AcAEYEsYeDVJqBxKnwAAA4bt/jYpHjVfFM6ys+IeircFMzKUgXsse19m8tF/oXVfzXloomeTYG9tAuZdEYqoVbleAVaMzFYuRqkPAYmhqX6vIRy4QVWbuF1uzPfYZMOD/11fcH0t49gphAKdHuYOCTlARmZEM9ks5RMmF82Eg5iJtmyJdD3Of51r2IzbpIrohGubFxsS/ZGZB4RjuaNTxCGNek0ZK/zPUnfO2N9Pqk1vm3QLt6xsIeU5cSiTCufIWTIgRWwfaAjSDiEHUSP8CABaqE+JQQ+1+D25ovGK5YezlUk2JZbgkXTLk3coAADjcvPkO816qjnLVrnUF1oFIzilKU8dtxJ1M2tWt0ASq600+o3loKpYp5otnwVoUM+07WlFnuylOh6xYXKZCR8xr5qRDGVwiZuiv6V6FGIso3kuiPCTJZlEsjOzIrpOT3/9O4Ad2mfFL/c8PTl3FCDtauKKn1urlmG34LV1FPov9WY9YhdmF/lTBVEQ5wP3e2X7iJyAAA/v//skvZQHlMG6Ht6hfOzR60RUF890a6erxGg6bpdE4Ycb6lnmOFmyRRO5q+f5LRlt51jWSi9AedmxFF9SPemyL5vtFgcvoGxcmZ0H64CqHgI3xsrCeFeyOAOPRy/iySNaVatnOQ1coGksdJDe4sh+AWt0VYfTtfHnUAKdqmUfevihlpAUP70O1qdV5Bh0NFh8piz2KrS42N2YSw4sETSk+7ht4/4w6RBJX7NBwkAAAAAAxfRKB/jykN/8EMMi1n1qMWrrUl6+08U5PuUNcnrc0V4+W1xEPFxagAAAC5M9741NmKWEiPuqmT5PEWy2RTfGwQquV3Y8Np/psMmB8IAMkKZEDXYafmCqihEabOkCHa1+lnmvJJ0gZjY6VVkLO3w+uci5A/2md5GMcGanFwc6apAk2N/BC4nB0L4Cphc4mKDGt7euJvJc+cLHXbcHWARtnDcxc8VdrUMPWtgD2EIoo9rAGQ55IJJEdWExR+uLk0j5Pg36K6reFc9LbtSKacu/Ap4Bnxw8X6oEqEJEGgpRvRPeN8u1yDQfRJW5ag9rJwfxqytLSNYEdUJTE3+kzR04T1Dvh5Nk7OPLvT5n17ern/4D+IvV/+XbiumQEwk9ZZ38yDdNC25h4rfqm9zOLyQGjLQQB2rl3eCvwhaqq5OQebcr77zfZt4Y1NFwicEWJAVBtsJTJ6Gi2Ut0XQP4fTEhhfLBG9dn01dXoW+iPtzEarv8I/m0M3KflpNDLfrBX6tYnhiGudBlFTkxuUZE9sT/rWbgaCdplA4DeWVZUkxGb9dtC9K0yiBpmQ0S23RAA357YzcAbv7EX1MAEODHtvUrfAcXhu+Qj/UySeTk6QjfcAEHaV3fCN9ox9Xo0rJk+uc0N1Pk/OxBVOQvo8geqNMD0O/UFlgo3rcXtBUaWzqeimgJt87Qw7g5FFTy54P7upsfkH2FUcJ5eAZjLiN31Xq7dHHYUgjHrEimdhqf+l0pFkmNnvfGE9RSBLuKAVYcDjeW4h5UKcS5WG0g99TTU1buTb2BieBQwRrSqWEQOnKgVY0yBxs8mn3g0SrmD/5kSE9l7O+1siShBnL7GClN1+hJKX8mfcmrEvCEiOthqWpOn70rW/FVlwB5v98PI8lv2tx0GODXYS2IHKkBQPGwhei2fDJwpKuD3pezIb/sRfwQMtfphtIB5SckwIGXAqHYOZ5CDpJt5xeQMFzssNWlBoUdu+viAjrfVoHBDyMFcHhmADTXBDX1f+HtiKJxA7e1mvkVE276GiGeKjd97xwajXPAcrn3GuabojiIzMPu4i/0TjYWmX+1m4F3N04gEfSKZ/iYdj51YwE/88du2HVcrkm8VQSPnkaSlTJF3+/k3p0K/h4BI4ySQeAST2YUBP7cVLVbN65TtGuEZYCWDBGDc7mQaUbmICwGZr3+AekHMpqauSVenzRcwZgqayas5XeQChJh8YqOvN7VBQhhf8XPMrwQkvGh16Mh5lCLQk+lMghCBsSgkHYADQljkfftTeL7HChC9Duu/Aklt/oLV5uO2ImETzzPMZ2n9cDzn47MzQ/DDz9+ddHO07J8wXxquBuPASleU3Aei2JNRRvbzJbzAKoKUoOJxcFVjrJp0aZ91wEZDVAQmkK7l1CEJyiVIFf2puY8ZAfDb+/ogHWpDSTMIWmuWifZPVLMIxlYw1g+jeQRrMERePAG1iLBwXiJuFHXD+5vkG90ieMV/7V8vF2mld7oK2lP6Q2tRdBAZzC8CosmEIaT1V3kaiRWvWDtJ0hwFdImlbjCoBi0BRTNPK7/oSnbF1TLgEKZ2AqgZFOmU8RgiUAWX+unEMdIYr0aU3ZLeMqhB/IG1zGTl+SrEvtOqfHGuk5ibYK5tAk2RaTQi/XvNWTryLOWxtEU9UnvQDeDJhGfVW5NoE5lXnJAxzEdDW7NWmincPwqjhh4V2N8O2ay0vs1EegzkCcxGWf8rIBe6L7No53a+z4GT6KR/t5J3G8SkJMzQhHRPJtGam5tQxw9YYY1sZE43igVyEVZFCk5oqs5quaXcvpPEr6AkVhftHyYOem1PSTKok5sWe6+O/b0QCRIIX4/EiVhomeVlVC37rVTvKWgOCOt0Y9F3iQst3KABeRpIdhPvIi2wUAeRE54tB8UOssOLUj/g58QeFlrqaKmYJyj0VV2ZZFMnH2wE3vxEMYqUEYQ2jqeWwnVPL63aK+PXL3Ykmaq3iL2T5zo1zD6BfugLilndMZYKbjxBhc64JliQIVx/KsWDZJIXskhRwB5C/M/jtd0jHPU/RZCxvP/SykW5z4lOjK/noV9oaS2lpzNlEy6EwkAw0oqiPJmkQsV10KfCmqwprpspIbW6TqWzoDG0LOaq9Ej+tarZU7bo40QDLF039+3zjm+r/V4sUSxrEnnd4Ip9OAG0sTJHbYe2cSDrK9IGicrW7HvpPNy5yVlGH7FifwCS72/6eXAf4bZ7f80aIQ9IE57rcxYR7SE8mVhLc8oytOMc/hp4FAejQzveaqTg8HjbnTEfJN860BDBrNjWBPL0tflAKqZCIf0pGOU838d87Snbitl6ozvNE7oMIjv1tB1taL7f8vmTodUYGE0HBkhmwbOfovxt1u4Jld/Nzy4ZRID/mUPFVecXgvFswyLp/h68z2Xg5Kio1zd57nX7UuWbf+DiooN1+3FLytZKcVTY8O7nloxRbvjoqS86GUIKNFzW9e8Dklq0DURrZtuykDs0bSUXfAzcjv4dzPdYy+Y9n9ZfbsUra9/8O1RT0H+NjI/L8wNXYxLZLlUHb7fzN4HnUNTcNMbew9tBgtoSuXFMwvVkH+W6sJPIRhGgHM2AXUlqmbpZu0MjaPpDmf+FA8hNnsh3Gef5cWhBCKIG//P////Gjqmfz6P2MBYoEEgRofrB6DKXTsmlDBsYA7Rss7gWr3PDhpQo+BJT1tPIg9hBmkSOdcnsT33KfhV+i3XNG8ER3JinfJA1V4ZouJ0JrPJLkcz21G2sCxhVQ5rAE8IVvyxe8qshL5W130a4G23rzSufGOuG2XhAQZCoqYacFJ/MXk6zG1yeg/Aj07bqTNzuW57UATMNMIl0K5ovOySQBG/Zq6tuIgigcmMUnCFgfZo/16oXFW6CWVXA8g4cmYpmNKXNZZzArEp9n+dr5o7gWGGtIfsELFNHXMP6HFCRzi+SxCcw3IC6fztMMcg9n5Ct3IGUtBoVWYYY+Mc095BM7zt5p2tBeB7aDQrpsUB/C75ftK5XxYlMQF6eMX8Bb+2ttjWVt0OizGL3mOTV6rNqhhobrULwOJe2KYKm7gL9UIoPg35MBZNojpx/DxbzvM13YcVsJcn+14F2lrkuPZvLHkbiZan33D3AJfQk0GzSMfDuacpnWR5y6RRCWQi7rc9JfFzpQBoaosYWoiBlyT7jvwwYEMlWH5LF5IwD/iwYsAAZsqvHbMpUUzTpBFW1ak1mIqb93YZvX7rUuUFBb/9DM23C2KzipeDIfll9aimsyalzj82bQpZ2Rqi9OjR9FsxBzq2ystczidrHuykk241hSTnSPqwNyWG/woUWpzGdt0LfAsxnmKrMaGrJk5dacl3k28eqkR/8w5VuefviiRpcw+GWqv9KmkFzcu84wfiZVklkIXdDZIr/8xEK190LogmPWmnRNJm5L4zLYEFHRX2NOVdtmpeESLjamnUxI8HBOdV7zU1J8qXru4aHAvhZjKEsXAPApo6QX611aFKYJ9PtxKNvu+4DqM+4wXb8dWMtCiVPuwcnVdMeEA6lfNK+nmmVGcZVLa+x/Mx+luYIr8I8X3VLQfbT0HfZrR2z4WBlkx61K2efs+EDDl0h1niPERzuE0xT+XRGSVNq2xYoo1wHqBu2BMyKfHCf3qfL34iXlvHHQky8/ygUJcq7XlvXORY3g6g1iIg8uuo1wZS6UDkLZga/NZdw7ftE8oszXAx3g/BprB1P4y2Ybia1t5ILZ6KNJ2ZszbyXtY23+BSQ4fV2zMPHKwuUfq/l/C+1bsZPO6UVyAU+BUZTw9iyd/DjBNqDEwspARRRrE8lN9HiujNH7LETAD/ivhOvSOxISsAqqvw9x9HEMPA3nkEocABKr7Cqw8UqZLMLyusq4hzLHEtIV8axqcnaM7WK28my7upR2z/4SKELZ6GTRXf/jufQosAQjVouUmywicv5ZTftJo6z159wpGp2FekSt6fiVgLEzrZrItGwPaaxNXezb2hOHhlSxPhzNraZ3Dsk/TL8zlFrClmXYB53ZfSdgwt8ONN+FYGd4+3Ubmku+93xCkmXN2++1h7MRRMm335Oy8/zPAfoXj2662Ka/KWN1mUwmKdplY7c70CeTSuxB8+k4IFK4g3kYWdUHJM2y3bxH05C55AvkieLwnRYn9Ee81m2piFEwRFJG0XCexiMg0MQgA3EC8GSYAonvE1Z8P2TQfec25SvpKRp5DS7s1eoHFLq1QVTxiTtt90pMabGRc0fJ4UCxqhxs0f98HM4t+SRfqO1qM/YrlgWrx517ne/4CMC9+NCDGKOEhWv5JoHF/q7skuwnxp2AE9M0Hk/xgXIEHInWuSzwoRxRP4L48h/ypnnO8VysM1g4gaPT31GzSWa34TjF+GCGHZWeBlfCJBudaOaDQJ7QCZZhGWvCpAyifwIqFCQSeatdo6f0MJGtY+Nppk4eUi3QA1ckEEMoHG1u4ZiceXugHp28wkSR0LrB3zkGwDND7pKN8ZOwBVrdMQIFJM4YZg5qk8oIbzi0Q4pggV/tmEBG8mYDLfxbiEp6ROxiF0v60nQsEAGHU3CNAI90lBg35rNXqbtGCzQjZM5G4Xrtfg3ST5RBucBo7vvHr5boOvmactGf0ebYXkhBsWMS+7cPUOR9zabku1zG786bApvpSd7DujN2GVaOqzK9dBK0yL1j0FL0RHZPRHlhoHkmc1/XJcOcod2wWQtuhnKWK/HnGwa4PDYLeHx4WmwB867fSrsDHoL+H7hU9xAxj1SoGu0qfssT/hwIjR9M8i3vLdjze4hsnX6A8HzzmpAkJyi+kQIJ3XKqmG3dP5M1cawRq0bxK3HAfOmhhoCEI4ntJ+83aOvqhB4sIc08fpJnVdPsKPFa898a4JoWMluLj7YTXoXv3EVmGB4lL/PDBu8HguX1+rE8b9DJJK6NsWva/GDOIJsyjAakXyVurUenuPlVLNwWoOiZ0Ubni9sg5nD+oF10/o55tmr5fCyjsr1T89MjZ0Umj97y3Y83uGvVVFlLYuTWIbP7NgDcxsNcQBCbGgXx48ncd5Gru2t2DYfV3a1q3/mWD8rigRFHxV7xeo+8BlneUZfzKC8a1Y8GqetjnsFiY20p/cdaT1qTj8YyrOlld8igKdsF1OTAp69HP1SJndHyuwZVNE2uCdw6VH8g+f+iacsmo56Sf9pdQGOeqhwnCUiulRgnJBCFFYluRG+c2yGxBUGDOG4FoFiSDgo1xz7rvl2NxP6WdrXzC/kvKBQ+IVltvtS91cnDjaWTp65M7Dt00nnxhsJvYRq90G2xzyZSCXZHJqAMAfCfRRzpOKGxP5nFV8odIs+LADh/iq1EV6I6ghPLGNt9nRfHZcu8zOFGx1nAkG9pATekJEYQb0PUvYl6Jdfhy3XdQ7HhtmXPf/cmZjvLphzk+54vomT53OD5v0xFhrhe0zMg4IlGrNfYeUqk7viHysdpHV3ERt9JvsLMVSLSdiOYcb+cNgbvbGHLTVLCZUX2I9kG0ZhQgknZuHty5mKqfECI2SR9x3ddih+6QYhX3BQyVBLYF7OTGmj/nzs131WGmHY6XNXBvWQmPXychoHLx71yjyDpDC68OzUGobRzysx/OQrxd0H6f/VVSbVHIaw2K62ioMEnpGpnmEzCeHd3lUVdnqHo7D//+V+HY56vBGlgM8nt2HTT4fnf58rmuVCfp4dPa9Y+rvkQcIyM0QEphvwpaD2AFNV2drwOunT7//wuTlJA24zlwsfrbLR1ZxKcNjbdEdePMY70pMsYB+Relny1C5b/IeLuL5e7m54gukiLAR1cKFdUfQIKcrC5f/36vMwgmb/2I+nY+EYokidcXXUee8IUfBEbmkUQDnXOvZfihfEChMf/jGAAAARzvmdIfalagZkNM+9ZfneEr3Kd4HF2pdDdtf9KNRX5e+MxpZcFUMcp6lix2DsRto+0NIrq8jMtYSNN0GjXlNY/7JmGV3DubLb4DL2uqVTvXnvIeJa+S1aBn2JyMfeTO1XtD//mQXEE2PWLcM9GPq4tvCdrXNRVFyQCJdGpyRE4XXv/IEBBDwOci6RTNy4L062Dz57y2wAXlY3djIGV5HwkhVG4DEPQfDqAAA==';

    // URL to the player
    const PLAYER_URL = 'https://tapeop.dev/';

    // ID of the banner, attached to the page
    const BANNER_ID = 'tape-operator-banner';

    // URL Matchers
    const KINOPOISK_MATCHER = /kinopoisk\.ru\/(film|series)\/.*/;
    const IMDB_MATCHER = /imdb\.com\/title\/tt\.*/;
    const TMDB_MATCHER = /themoviedb\.org\/(movie|tv)\/\.*/;
    const LETTERBOXD_MATCHER = /letterboxd\.com\/film\/\.*/;
    const MATCHERS = [KINOPOISK_MATCHER, IMDB_MATCHER, TMDB_MATCHER, LETTERBOXD_MATCHER];

    // Logging utility
    const logger = {
        info: (...args) => console.info('[Tape Operator Script]', ...args),
        error: (...args) => console.error('[Tape Operator Script]', ...args)
    };

    let previousUrl = '/';
    let cachedResults = {};

    /**
     * Initialize banner on the page
     */
    async function initBanner() {
        const observer = new MutationObserver(() => updateBanner());
        observer.observe(document, { subtree: true, childList: true });
        updateBanner();
    }

    /**
     * Update banner based on the current movie data on page
     */
    function updateBanner() {
        const url = getCurrentURL();

        // Skip to prevent unnecessary updates
        if (url === previousUrl) return;

        // Check if URL matches
        const urlMatches = MATCHERS.some((matcher) => url.match(matcher));
        if (!urlMatches) return removeBanner();

        // Check if title is present
        const extractedTitle = extractTitle();
        if (!extractedTitle) return removeBanner();

        // Movie found, now we can stop searching
        previousUrl = url;
        attachBanner();
    }

    /**
     * Extract movie data from the page
     */
    function extractMovieData() {
        const url = getCurrentURL();

        // Movie title
        const title = extractTitle();
        if (!title) return null;

        // Kinopoisk ID
        if (url.match(KINOPOISK_MATCHER)) {
            const id = url.split('/').at(4);
            return { kinopoisk: id, title };
        }

        // IMDB ID
        if (url.match(IMDB_MATCHER)) {
            const id = url.split('/').at(4);
            return { imdb: id, title };
        }

        // TMDB ID
        if (url.match(TMDB_MATCHER)) {
            const id = url.split('/').at(4).split('-').at(0);
            return { tmdb: id, title };
        }

        // IMDB ID from Letterboxd
        if (url.match(LETTERBOXD_MATCHER)) {
            const elements = document.querySelectorAll('a');
            const elementsArray = Array.from(elements);

            // Find IMDB ID
            const imdbLink = elementsArray.find((link) => link?.href?.match(IMDB_MATCHER));
            if (imdbLink) {
                const imdbId = imdbLink.href.split('/').at(4);
                if (imdbId) return { imdb: imdbId, title };
            }

            // Find TMDB ID
            const tmdbLink = elementsArray.find((link) => link?.href?.match(TMDB_MATCHER));
            if (tmdbLink) {
                const tmdbId = tmdbLink.href.split('/').at(4)?.split('-')?.at(0);
                if (tmdbId) return { tmdbId: tmdbId, title };
            }

            return null;
        }

        return null;
    }

    /**
     * Get current URL.
     * @returns {string} Current url without query parameters and hashes.
     */
    function getCurrentURL() {
        return location.origin + location.pathname;
    }

    /**
     * Extract movie title from the page
     * @returns {string} The extracted title
     */
    function extractTitle() {
        try {
            const titleElement = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]');
            if (!titleElement) return null;

            let title = titleElement?.content?.trim();
            if (!title) return null;

            // Skip default Kinopoisk title
            if (title.startsWith('Кинопоиск.')) return null;

            // Remove title attachment from IMDB
            if (title.includes('⭐')) {
                return title.split('⭐').at(0).trim();
            }

            // Any other IMDB attachment
            if (title.endsWith('- IMDb') && title.includes(')')) {
                const lastParenthesisIndex = title.lastIndexOf(')');
                return title.slice(0, lastParenthesisIndex + 1).trim();
            }

            return title;
        } catch (error) {
            return null;
        }
    }

    /**
     * Add banner element to the page
     */
    function attachBanner() {
        if (document.getElementById(BANNER_ID)) return;

        const banner = document.createElement('button');
        banner.id = BANNER_ID;
        banner.style.all = 'unset';
        banner.style.backgroundImage = `url(${BANNER_IMAGE})`;
        banner.style.backgroundSize = 'contain';
        banner.style.backgroundRepeat = 'no-repeat';
        banner.style.width = '32px';
        banner.style.height = '128px';
        banner.style.top = '-48px';
        banner.style.left = '8px';
        banner.style.opacity = '0';
        banner.style.outline = 'none';
        banner.style.cursor = 'pointer';
        banner.style.position = 'fixed';
        banner.style.zIndex = '9999999999';
        banner.style.transition = 'opacity 0.15s ease, top 0.15s ease';
        banner.style.filter = 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))';

        // Events
        banner.addEventListener('mouseover', () => (banner.style.top = '-12px'));
        banner.addEventListener('mouseout', () => (banner.style.top = '-24px'));
        banner.addEventListener('click', () => openPlayer());
        banner.addEventListener('mousedown', (event) => event.button === 1 && openPlayer(true));


        setTimeout(() => {
            banner.style.top = '-24px';
            banner.style.opacity = '1';
        }, 300);

        document.body.appendChild(banner);
    }

    /**
     * Remove banner from the page
     */
    function removeBanner() {
        document.getElementById(BANNER_ID)?.remove();
    }

    /**
     * Open player with the extracted data
     * @param {boolean} loadInBackground If true, page will be opened in background
     */
    async function openPlayer(loadInBackground = false) {
        const data = extractMovieData();
        if (!data) return logger.error('Failed to extract movie data');

        await GM.setValue('movie-data', data);
        let movieId;
        if (data.imdb) {
            movieId = data.imdb;
        } else if (data.tmdb) {
            movieId = data.tmdb;
        } else if (data.kinopoisk) {
            movieId = data.kinopoisk;
        }
        logger.info('Opening player for movie', data);
        GM.openInTab(`${PLAYER_URL}?movie=${movieId}`, loadInBackground);
    }

    /**
     * Init player with the extracted data.
     * Executed on the player page only.
     */
    async function initPlayer() {
        // Check if the URL has a movie parameter, if so, do not clear container
        const urlParams = new URLSearchParams(window.location.search);
        const movieParam = urlParams.get('movie');
        if (movieParam) {
            const data = await GM.getValue('movie-data', {});
            await GM.deleteValue('movie-data');

            // Skip initialization if no data
            if (!data || Object.keys(data).length === 0) return;

            // Stringify data twice to prevent XSS and automatically escape quotes
            const dataSerialized = JSON.stringify(JSON.stringify(data));
            const versionSerialized = JSON.stringify(VERSION);

            // Inject data to the player
            const scriptElement = document.createElement('script');
            scriptElement.innerHTML = `globalThis.init(JSON.parse(${dataSerialized}), ${versionSerialized});`;
            document.body.appendChild(scriptElement);

            logger.info('Injected movie data:', data);
            return;
        }
        setupSearchPage();
        const data = await GM.getValue('movie-data', null);
        await GM.deleteValue('movie-data');

        if (data) {
            const background = document.getElementById('background');
            if (background) {
                if (data.imdb) {
                    getImdbBackdrop(data.imdb).then(imageUrl => {
                        if (imageUrl) {
                            background.style.backgroundImage = `url("${imageUrl}")`;
                        }
                    });
                } else if (data.tmdb) {
                    background.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${data.tmdb}.jpg")`;
                } else if (data.kinopoisk) {
                    getKinopoiskBackdrop(data.kinopoisk).then(imageUrl => {
                        if (imageUrl) {
                            background.style.backgroundImage = `url("${imageUrl}")`;
                        }
                    });
                }
            }
        }
    }

    async function getImdbBackdrop(imdbId) {
        try {
            const response = await GM_xmlhttpRequest({
                method: "GET",
                url: `https://www.imdb.com/title/${imdbId}/mediaindex`,
                responseType: "text",
                headers: {
                    "User-Agent": navigator.userAgent
                }
            });

            const $ = cheerio.load(response.responseText);
            const backdropUrl = $('.media_index_thumb_list img').first().attr('src');
            if (backdropUrl) {
                return backdropUrl.replace(/_V1_UX128_CR0,0,128,176_AL_.jpg$/, '_V1_.jpg');
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching IMDb backdrop:', error);
            return null;
        }
    }
    async function getKinopoiskBackdrop(kinopoiskId) {
        try {
            const response = await GM_xmlhttpRequest({
                method: "GET",
                url: `https://kinopoisk.ru/film/${kinopoiskId}`,
                responseType: "text",
                headers: {
                    "User-Agent": navigator.userAgent
                }
            });

            const $ = cheerio.load(response.responseText);
            const backdropUrl = $('.film-page-posters img').first().attr('src');
            if (backdropUrl) {
                return backdropUrl;
            } else {
                return null
            }
        } catch (error) {
            console.error('Error fetching Kinopoisk backdrop:', error);
            return null;
        }
    }


    function setupSearchPage() {
        const container = document.getElementById('container');
        clearContainer();
        const searchDiv = document.createElement('div');
        searchDiv.style.display = 'flex';
        searchDiv.style.flexDirection = 'column';
        searchDiv.style.overflowY = 'auto';
         searchDiv.style.overflowX = 'hidden';
        searchDiv.style.alignItems = 'center';
        searchDiv.style.justifyContent = 'flex-start';
        searchDiv.style.maxHeight = '100vh';
        searchDiv.style.height = '100vh';

        const mainSearchDiv = document.createElement('div');
        mainSearchDiv.style.display = 'flex';
        mainSearchDiv.style.alignItems = 'center';

        const mainSearchInput = document.createElement('input');
        mainSearchInput.type = 'text';
        mainSearchInput.placeholder = 'Поисковик';
        mainSearchInput.style.padding = '8px';
        mainSearchInput.style.marginRight = '8px';
        mainSearchInput.style.border = '1px solid #ccc';
        mainSearchInput.style.width = '300px';
        mainSearchInput.style.borderRadius = '5px';

        const mainSearchButton = document.createElement('button');
        mainSearchButton.textContent = 'Искать';
        mainSearchButton.style.padding = '8px';
        mainSearchButton.style.backgroundColor = '#007bff';
        mainSearchButton.style.color = 'white';
        mainSearchButton.style.border = 'none';
        mainSearchButton.style.borderRadius = '5px';
        mainSearchButton.style.cursor = 'pointer';
        mainSearchButton.style.height = '17px';

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Сбросить';
        resetButton.style.padding = '8px';
        resetButton.style.marginLeft = '8px';
        resetButton.style.backgroundColor = '#dc3545';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '5px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.height = '17px';


        mainSearchDiv.appendChild(mainSearchInput);
        mainSearchDiv.appendChild(mainSearchButton);
        mainSearchDiv.appendChild(resetButton);
        searchDiv.appendChild(mainSearchDiv);

        const feedbackMessageMain = document.createElement('div');
        feedbackMessageMain.className = 'feedback-message';
        feedbackMessageMain.style.padding = '8px';
        feedbackMessageMain.style.marginTop = '10px';

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.marginTop = '10px';
        resultsContainer.style.width = '100%';
        resultsContainer.style.overflowY = 'auto';
         resultsContainer.style.paddingRight = '10px';
        // Custom scrollbar styles
         resultsContainer.style.scrollbarWidth = 'thin';
        resultsContainer.style.scrollbarColor = 'rgba(255, 255, 255, 0.6) transparent';
        resultsContainer.style.setProperty('--scrollbar-size', '8px');
        resultsContainer.innerHTML += `
            <style>
              .search-results::-webkit-scrollbar {
                width: var(--scrollbar-size);
              }
              .search-results::-webkit-scrollbar-track {
                 background: transparent;
              }
              .search-results::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
              }
            </style>
          `;


        searchDiv.appendChild(feedbackMessageMain);
        searchDiv.appendChild(resultsContainer);
        container.appendChild(searchDiv);

        const searchPlatforms = [
            { name: "IMDb", matcher: IMDB_MATCHER, searchFunction: searchIMDbUI }
        ];

        searchPlatforms.forEach(platform => {
            const platformDiv = document.createElement('div');
            platformDiv.style.display = 'flex';
            platformDiv.style.flexDirection = 'column';
            const labelDiv = document.createElement('div');
            labelDiv.style.display = 'flex';
            labelDiv.style.alignItems = 'center';
            labelDiv.style.justifyContent = 'space-between';
            const label = document.createElement('h2');
            label.textContent = platform.name;
            labelDiv.appendChild(label);

            if (platform.name === "IMDb") {
                const apiKeyButton = document.createElement('button');
                apiKeyButton.textContent = 'Добавить API';
                apiKeyButton.style.marginLeft = '10px';
                apiKeyButton.style.padding = '5px 10px';
                apiKeyButton.style.backgroundColor = '#deb522';
                apiKeyButton.style.color = 'white';
                apiKeyButton.style.border = 'none';
                apiKeyButton.style.borderRadius = '5px';
                apiKeyButton.style.cursor = 'pointer';

                const apiKeyContainer = document.createElement('div');
                apiKeyContainer.style.display = 'none';
                apiKeyContainer.style.flexDirection = 'column';
                apiKeyContainer.style.marginTop = '10px';
                const apiKeyInput = document.createElement('input');
                apiKeyInput.type = 'text';
                apiKeyInput.placeholder = 'Type your API key...';
                apiKeyInput.style.padding = '8px';
                apiKeyInput.style.marginRight = '8px';
                apiKeyInput.style.border = '1px solid #ccc';
                apiKeyInput.style.width = '300px';
                apiKeyInput.style.borderRadius = '5px'; // Add rounded corners


                const saveApiKeyButton = document.createElement('button');
                saveApiKeyButton.textContent = 'Сохранить API';
                saveApiKeyButton.style.padding = '8px';
                saveApiKeyButton.style.marginRight = '8px';

                const generateApiKeyButton = document.createElement('button');
                generateApiKeyButton.textContent = 'Сгенерировать API';
                generateApiKeyButton.style.padding = '8px';

                const obligatoryText = document.createElement('span');
                obligatoryText.textContent = 'Обязательно';
                obligatoryText.style.opacity = '0.5';
                obligatoryText.style.marginLeft = '5px';

                apiKeyContainer.appendChild(apiKeyInput);
                apiKeyContainer.appendChild(saveApiKeyButton);
                apiKeyContainer.appendChild(generateApiKeyButton);

                labelDiv.appendChild(apiKeyButton);
                platformDiv.appendChild(labelDiv);
                platformDiv.appendChild(apiKeyContainer);
                platformDiv.appendChild(obligatoryText);

                apiKeyButton.addEventListener('click', () => {
                    apiKeyContainer.style.display = apiKeyContainer.style.display === 'none' ? 'flex' : 'none';
                    obligatoryText.style.display = apiKeyContainer.style.display === 'none' ? 'inline' : 'none';
                    apiKeyButton.textContent = apiKeyContainer.style.display === 'none' ? 'Добавить API' : 'Свернуть';
                });


                GM.getValue('omdbApiKey', '').then(apiKey => {
                    apiKeyInput.value = apiKey;
                });

                saveApiKeyButton.addEventListener('click', async () => {
                    await GM.setValue('omdbApiKey', apiKeyInput.value);
                });

                generateApiKeyButton.addEventListener('click', () => {
                    GM.openInTab('https://www.omdbapi.com/apikey.aspx', true);
                });
            } else {
                platformDiv.appendChild(labelDiv);
            }

            const platformFeedbackMessage = document.createElement('div');
            platformFeedbackMessage.className = 'platform-feedback-message';
            platformFeedbackMessage.style.padding = '8px';
            platformFeedbackMessage.style.marginTop = '10px';

            const platformResults = document.createElement('div');
            platformResults.className = 'platform-results';
            platformResults.style.marginTop = '10px';
            platformResults.style.width = '100%';
            platformResults.style.position = 'relative';
            platformResults.style.borderTop = '1px solid #ccc';
            platformResults.style.paddingRight = '10px';
               platformResults.style.scrollbarWidth = 'thin';
            platformResults.style.scrollbarColor = 'rgba(255, 255, 255, 0.6) transparent';
            platformResults.style.setProperty('--scrollbar-size', '8px');
            platformResults.innerHTML += `
            <style>
              .platform-results::-webkit-scrollbar {
                width: var(--scrollbar-size);
              }
              .platform-results::-webkit-scrollbar-track {
                background: transparent;
              }
              .platform-results::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.6);
                 border-radius: 50%;
              }
            </style>
          `;


            const loadingLine = document.createElement('div');
            loadingLine.className = 'loading-line';
            loadingLine.style.position = 'absolute';
            loadingLine.style.top = '0';
            loadingLine.style.left = '0';
            loadingLine.style.width = '100%';
            loadingLine.style.height = '2px';
            loadingLine.style.backgroundColor = '#eee';
            loadingLine.style.overflow = 'hidden';
            loadingLine.style.display = 'none';



            platformDiv.appendChild(platformFeedbackMessage);
            platformDiv.appendChild(platformResults);
            searchDiv.appendChild(platformDiv);

            mainSearchButton.addEventListener('click', async () => {
                const query = mainSearchInput.value;
                 search(query, platform, platformFeedbackMessage, platformResults, loadingLine);


            });
            mainSearchInput.addEventListener('keypress', async (event) => {
                if (event.key === 'Enter') {
                     const query = mainSearchInput.value;
                     search(query, platform, platformFeedbackMessage, platformResults, loadingLine);
                }
            });
            resetButton.addEventListener('click', () => {
                mainSearchInput.value = '';
                resultsContainer.innerHTML = '';
                platformResults.innerHTML = '';
                feedbackMessageMain.textContent = '';
                platformFeedbackMessage.textContent = '';
                loadingLine.style.display = 'none';
            });


        });

        setInterval(removeErrorMessages, 2000);
    }
    function startLoadingAnimation(feedbackMessage) {
        let dots = '';
        const interval = setInterval(() => {
            dots = dots.length < 3 ? dots + '.' : '';
            feedbackMessage.textContent = 'Загрузка результатов' + dots;
        }, 500);
        feedbackMessage.dataset.intervalId = interval;
    }

    function stopLoadingAnimation(feedbackMessage) {
        const intervalId = feedbackMessage.dataset.intervalId;
        if (intervalId) {
            clearInterval(parseInt(intervalId, 10));
            feedbackMessage.dataset.intervalId = '';
        }
    }
    function clearContainer() {
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = '';
            const errorMessageDiv = document.querySelector('div.message.error');
            if (errorMessageDiv) {
                errorMessageDiv.remove();
            }
        }
    }

    let errorMessageDiv = null;

    function removeErrorMessages() {
        if (!errorMessageDiv) {
            errorMessageDiv = document.querySelector('div.message.error');
        }
        if (errorMessageDiv) {
            errorMessageDiv.remove();
            errorMessageDiv = null;
        }
    }
    async function search(query, platform, platformFeedbackMessage, platformResults, loadingLine) {
         if (!query) {
                    loadingLine.style.display = 'none';
                    return;
                }
                platformFeedbackMessage.textContent = 'Загрузка результатов.';
                loadingLine.style.display = 'block';
                startLoadingAnimation(platformFeedbackMessage);

                const translatedQuery = await translateText(query);

                const results = await (platform.searchFunction ? platform.searchFunction(translatedQuery, platform.name) : []);
                displayPlatformResults(results, platformFeedbackMessage, platformResults, loadingLine);
    }

    async function displayPlatformResults(results, feedbackMessage, resultsContainer, loadingLine) {
         resultsContainer.innerHTML = '';
        stopLoadingAnimation(feedbackMessage);
          loadingLine.style.display = 'none';
        if (!results.length) {
            feedbackMessage.textContent = 'Ничего не найдено.';
            return;
        }
        feedbackMessage.textContent = 'Найденные результаты:';

        for (const result of results) {
            const resultDiv = document.createElement('div');
            resultDiv.style.display = 'flex';
            resultDiv.style.alignItems = 'center';
            resultDiv.style.padding = '8px';
            resultDiv.style.borderBottom = '1px solid #eee';
            resultDiv.style.cursor = 'pointer';

            const img = document.createElement('img');
            img.src = result.img;
            img.style.width = '50px';
            img.style.height = 'auto';
            img.style.marginRight = '8px';

            const textDiv = document.createElement('div');
            let titleText = `${result.title}`;

            textDiv.innerHTML = `${titleText} (${result.year})`;
            if (result.imdbRating) {
                textDiv.innerHTML += `<br>IMDb Rating: ${result.imdbRating}`;
            }


            resultDiv.appendChild(img);
            resultDiv.appendChild(textDiv);
            resultsContainer.appendChild(resultDiv);
            resultDiv.addEventListener('click', async () => {
                await handleResultClick(result);
            });
        }
    }
    async function handleResultClick(result) {
        const url = result.link;
        const title = result.title;
        let data = null;
        if (url.match(IMDB_MATCHER)) {
            const id = url.split('/').at(4);
            data = { imdb: id, title };
        }
        if (data) {
            await GM.setValue('movie-data', data);
            GM.openInTab(`${PLAYER_URL}?movie=${data.imdb}`, false);
        }
    }

    async function translateText(text) {
        try {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=${encodeURIComponent(text)}`);
            const data = await response.json();
            return data[0][0][0];
        } catch (error) {
            logger.error('Error during translation:', error);
            return text;
        }
    }

    async function searchIMDbUI(query, platformName) {
        return new Promise(resolve => {
            GM.getValue('omdbApiKey', '').then(async apiKey => {
                if (!apiKey) {
                    resolve([]);
                    return;
                }
                let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
                fetch(url)
                    .then(response => response.json())
                    .then(async data => {
                        if (data.Response === "False" || !data.Search) {
                            resolve([]);
                            return;
                        }
                        const results = data.Search.map(item => ({
                            title: item.Title,
                            year: item.Year,
                            link: `https://www.imdb.com/title/${item.imdbID}`,
                            source: platformName,
                            img: item.Poster !== 'N/A' ? item.Poster : '../images/404.png',
                            imdbID: item.imdbID
                        }));
                        for (const result of results) {
                            const detailedResult = await fetchDetailedIMDbInfo(result.imdbID, apiKey);
                            if (detailedResult) {
                                result.imdbRating = detailedResult.imdbRating
                            }
                        }
                        resolve(results);
                    })
                    .catch(() => {
                        resolve([]);
                    });
            });
        });
    }
    async function fetchDetailedIMDbInfo(imdbID, apiKey) {
        return new Promise(resolve => {
            let imdbUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=short`;
            fetch(imdbUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === "False") {
                        resolve(null);
                    } else {
                        resolve({
                            imdbRating: data.imdbRating,
                        });
                    }
                })
                .catch(() => {
                    resolve(null);
                });
        });
    }
    // Init player or banner
    logger.info('Script executed');
    if (location.href.includes(PLAYER_URL)) {
        initPlayer();
    } else {
        initBanner();
    }
})();
