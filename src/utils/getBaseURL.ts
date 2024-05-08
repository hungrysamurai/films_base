const getBaseURL = (url = '') => {
 return `${import.meta.env.BASE_URL}${url}`
}

export default getBaseURL;