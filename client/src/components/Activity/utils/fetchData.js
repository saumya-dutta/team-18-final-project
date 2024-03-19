export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '77c9d21713msh2c391af7138989dp1ed369jsn980aaa71da2c',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    },
};

export const fetchData = async(url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

