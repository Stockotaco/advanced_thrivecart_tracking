var iframesource = "thrivecart.com";
var waitInterval = 3;
(function () {
    var getCookie = function (name) {
            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        updateFrames = function () {
            frames.forEach(function (frame) {
                var url = new URL(frame.src),
                    qs = new URLSearchParams(url.search),
                    uid = ((window.CLabsgbVar || {}).generalProps || {}).uid,
                    update;

                if (cookies._fbc && qs.get('passthrough[fbc]') !== cookies._fbc)
                    update = void qs.set('passthrough[fbc]', cookies._fbc) || 1;

                if (cookies._fbp && qs.get('passthrough[fbp]') !== cookies._fbp)
                    update = void qs.set('passthrough[fbp]', cookies._fbp) || 1;

                if (uid && qs.get('passthrough[uid]') !== uid)
                    update = void qs.set('passthrough[uid]', uid) || 1;

                update && ((url.search = qs.toString()), (frame.src = url.toString()));
            });
        },
        awaitNode = function (params) {
            return new MutationObserver(function (mutations) {
                var elem = document.querySelector(
                    params.selector + ':not(.fbpfbc_checked)'
                );
                elem && (elem.classList.add('fbpfbc_checked'), params.done(elem));
            }).observe(params.parent || document, {
                subtree: true,
                childList: true,
            });
        },
        frame_selector = `iframe[src*="${iframesource}"]`,
        frames = [],
        cookies = {};

    // collect any added frames
    document
        .querySelectorAll(frame_selector + ':not(.fbpfbc_checked)')
        .forEach(function (frame) {
            frames.push(frame);
        });

    frames.length && updateFrames();

    // wait for future frames, including JS rendered
    awaitNode({
        selector: frame_selector,
        parent: document.documentElement,
        done: function (frame) {
            frames.push(frame);
            updateFrames();
        },
    });

    // collect cookies
    var intstart = +new Date(),
        cinterval = setInterval(function () {
            if (!getCookie('_fbc')) return;
            if (+new Date() - intstart < 1 * waitInterval) return;
            if (getCookie('_fbc')) {
                cookies._fbc = getCookie('_fbc');
                updateFrames();
                return clearInterval(cinterval);
            }

            if (+new Date() - intstart > 20000) return clearInterval(cinterval);
        }, 200),
        pinterval = setInterval(function () {
            if (!getCookie('_fbp')) return;
            if (+new Date() - intstart < 1 * waitInterval) return;
            if (getCookie('_fbp')) {
                cookies._fbp = getCookie('_fbp');
                updateFrames();
                return clearInterval(pinterval);
            }

            if (+new Date() - intstart > 20000) return clearInterval(pinterval);
        }, 200);
})();
