/**
 * Scans the DynamoDB datasource. Scans up to the provided `limit` and stards from the provided `NextToken` (optional).
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBScanRequest} the request
 */
export function request(ctx) {
  const { authors } = ctx.source;
  const ids = {};
  authors.forEach( (id, i) => ids[`:id${i}`] = id ); //convert to map { ':id0': 1, ':id1': 2,  etc }
  return { 
      operation: "Scan",
      filter: {
          expression: `id IN ( ${Object.keys(ids).join()} )`,
          expressionValues: util.dynamodb.toMapValues( ids )
      }
  };
}

/**
 * Returns the scanned items
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} a flat list of results from the Scan operation
 */
export function response(ctx) {
  return ctx.result.items;
}
