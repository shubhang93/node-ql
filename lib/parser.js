import fs from 'fs-extra'


export default function (filePath) {
    const buffer = fs.readFileSync(filePath, "utf-8")
    return buffer.split(/--name:*/)
        .filter(query => query)
        .map(query => query.split('\n'))
        .map(query => {
            let [queryFn, ...statement] = query
            return {fnName: queryFn.trim(), statement: statement.join(' ').trim()}
        })


}

