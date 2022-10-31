/**
 * htmlspecialchars
 *
 * @param {string} txt
 * @returns {string} html special characters escaped text
 */
const htmlspecialchars = (txt) => {
    if (typeof txt !== 'string') {
        return txt;
    }
    return txt.replace(
        /[&'`"<>]/g,
        function (match) {
            return {
                '&': '&amp;',
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;',
            }[match]
        }
    );
}

/**
 * generateSignalSendURL
 *
 * @param {string} url
 * @param {string} width
 * @param {string} height
 * @returns {string} error message (return empty string when validate is true.)
 */
const generateSignalSendURL = (url) => {
    const signalSendURLPrefix = 'https://www.google.com/ping?sitemap=';
    return `${signalSendURLPrefix}${url}`;
};

window.addEventListener('load', () => {
    const $generateButton = document.querySelector('#generate');

    $generateButton.addEventListener('click', () => {
        // ボタンがクリックされたら
        const $URL = document.querySelector('#sitemap-url');
        // 値取得
        const URL = $URL.value;
        if (URL.length === undefined || URL.length === 0) {
            alert('URL が空です。');
            return false;
        }
        // JS だと CORS で引っかかるので fetch チェックは除外
//        fetch(URL, {
//            method: 'GET'
//        })
//            .then(response => {
//                if (!response.ok) {
//                    console.error('response.ok:', response.ok);
//                    console.error('esponse.status:', response.status);
//                    console.error('esponse.statusText:', response.statusText);
//                    throw new Error(response.statusText);
//                }
                const signalSendURL = generateSignalSendURL(encodeURIComponent(htmlspecialchars(URL)));
                const $signalSendURL = document.querySelector('#signal-send-url');
                $signalSendURL.setAttribute('href', signalSendURL);
//            })
//            .catch(error => {
//                console.error('エラーが発生しました', error);
//                alert('エラーが発生しました', error);
//            });

    });
});
