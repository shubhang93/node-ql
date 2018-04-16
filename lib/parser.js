import fs from 'fs-extra'


export default function (filePath) {
    const buffer = fs.readFileSync(filePath, "utf-8")
    let queryList = buffer.split(/--name:*/)
        .filter(query => query)
        .map(query => query.split('\n'))
        .map(query => {
            let [queryFn, ...statement] = query
            return {fnName: queryFn.trim(), statement: statement.join(' ').trim()}
        })


    console.log({queryList})

    return queryList
    // console.log({queryList})
    // queryList.forEach(query => {
    //     let fnName = query[0].trim()
    //     queryMap[fnName] = query[1]

}

