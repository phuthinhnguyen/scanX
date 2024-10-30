export function gettoppost(posts,article){
    let value=[]
    for (let item of posts){
        value.push(item[article])
    }
    return [posts.filter(item=>item[article]==Math.max(...value))[0]]
}   