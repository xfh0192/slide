

import axios from 'axios'
import h from './base'

export default {
    request: (apiParams, method, postData) => {
        let url = getApiUrl(apiParams)

        axios[method](uri)
    }
}

function getApiUrl (apiParams) {
    if (h.typeof(apiParams) !== 'Array') {
        
    }

    let baseUrl = h.home();


}