import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_LOCATION
const LOCAL_STORAGE_KEY = "API_KEY"

const COMMON_ERROR_CODES = {
    403: "Access Denied",
    401: "Authorization unsuccessful",
    400: "Bad request"
}

export default new class {

    _setupHTTPObject() {
        const token = sessionStorage.getItem(LOCAL_STORAGE_KEY)

        let headers = {}
        if (token) {
            headers = {'Authorization': `Key ${token}`}
        }

        this.http = axios.create({
            baseURL: API_BASE_URL,
            headers: headers
        })
    }

    constructor() {
        this._setupHTTPObject()
    }

    get haveApiKey() {
        return !!sessionStorage.getItem(LOCAL_STORAGE_KEY)
    }

    _performApiCall(method, url, data = null, expectedStatus = 200, errorTexts = COMMON_ERROR_CODES) {

        return new Promise((resolve, reject) => {

            if (!this.haveApiKey) {
                return reject({
                    status: null,
                    text: "API key not set",
                    data: null
                })
            }

            this.http.request({
                method, url, data
            }).then((response) => {

                if (response.status === expectedStatus) {
                    return resolve(response.data)
                } else {
                    return reject({
                        status: response.status,
                        text: errorTexts[response.status] || "Network or server error... Try again later.",
                        data: response.data
                    })
                }


            }).catch((error) => {

                if (!error.response) { // Network error (CORS?)


                    return reject({
                        status: null,
                        text: "Network or server error... Try again later.",
                        data: null
                    })

                } else {  // Server side errror

                    if (error.response.status === expectedStatus) {
                        return resolve(error.response.data)
                    } else {

                        return reject({
                            status: error.response.status,
                            text: errorTexts[error.response.status] || "Network or server error... Try again later.",
                            data: error.response.data
                        })

                    }
                }

            })

        })

    }

    setApiKey(key) {
        sessionStorage.setItem(LOCAL_STORAGE_KEY, key)
        this._setupHTTPObject()
    }

    listReporters() {
        return this._performApiCall("get", "/reporter")
    }

    getReporter(id) {
        return this._performApiCall("get", "/reporter/" + id)
    }

    createReporter(data) {
        return this._performApiCall("post", "/reporter", data, 201)
    }

    patchReporter(id, data) {
        return this._performApiCall("patch", "/reporter/" + id, data)
    }

    deleteReporter(id) {
        return this._performApiCall("delete", "/reporter/" + id)
    }
}