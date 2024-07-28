
export const categotriesList=[
    'All Categories',
    'Politics',
    'Buisness',
    'Tech',
    'Arts',
    'Science',
    'Health',
    'Sports',
]

export const getFeeds=(url)=>{
    return new Promise((resolve,reject)=>{
        fetch(url).then(res=>res.json())
        .then(data=>{
            resolve(data?.response ?? data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}