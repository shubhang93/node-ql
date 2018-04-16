import parser from "./parser";

const extractQueryParams = function (queryStatement) {
    let params = queryStatement.split(/:id\w/)
}

const NodeQl = function (config) {
    this.filePath = config.filePath
    this.queryList = parser(this.filePath)
    this.queryMap = this.queryList.reduce((qmap, qObject) => ({
        ...qmap, [qObject.fnName]: qObject.statement
    }), {})
    this.queryNames = Object.keys(this.queryMap)

    return new Proxy(this, {
        get(target, propKey) {
            if (!target.queryNames.includes(propKey))
                throw new Error(`Unable to Find SQL - Query ${propKey} in ${target.filePath}`)
            return function () {
                let queryStatement = target.queryMap[propKey]
                console.log({queryStatement})
            }
        }
    })

}

export default NodeQl