const fetch = require('node-fetch');

module.exports = async (url, opts = {}) => {
    let retry = opts.retry || 3
    while (retry > 0) {
        try {
            return await fetch(url, opts)
        } catch(e) {
            if (opts.callback) {
                opts.callback(retry)
            }
            retry = retry - 1
            if (retry == 0) {
                throw e
            }
        }
    }
};
