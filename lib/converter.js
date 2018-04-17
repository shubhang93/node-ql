import parser from "./parser";

const util = require('util')

const extractQueryParams = function (queryStatement) {
    let params = queryStatement.match(/:\w+/g)
    if (!params) return []
    return [...params]
}


const NodeQl = function (config) {
    this.filePath = config.filePath
    this.queryList = parser(this.filePath)
    this.queryMap = this.queryList.reduce((qmap, qObject) => ({
        ...qmap, [qObject.fnName]: qObject.statement
    }), {})
    this.queryNames = Object.keys(this.queryMap)
    this.sqlExecutorFn = util.promisify(config.connection[config.sqlExecutorFn].bind(config.connection)
    )


    return new Proxy(this, {
        get(target, propKey) {

            if (propKey in target)
                return target[propKey]

            if (!target.queryNames.includes(propKey))
                throw new Error(`Unable to Find SQL - Query ${propKey} in ${target.filePath}`)
            return (queryParams = {}) => {


                let queryStatement = target.queryMap[propKey]
                let params = extractQueryParams(queryStatement)
                if (params.length < 1) {
                    return target.sqlExecutorFn(queryStatement)
                }


                let paramKeys = Object.keys(queryParams)
                if (paramKeys.length < 1)
                    throw new Error(`${propKey} requires params to execute`)
                if (params.length !== paramKeys.length)
                    throw new Error(`${propKey} was passed incorrect number of Params`)
                let paramReplacerRegex = new RegExp(paramKeys.map(key => ':' + key).join('|'), 'g')
                let sqlStatementExecutable = queryStatement.replace(paramReplacerRegex, param =>
                    `"${queryParams[param.slice(1, param.length)]}"`
                )
                return target.sqlExecutorFn(sqlStatementExecutable)
            }
        }
    })

}

export default NodeQl