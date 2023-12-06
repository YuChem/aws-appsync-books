/**
 * Scans the DynamoDB datasource. Scans up to the provided `limit` and stards from the provided `NextToken` (optional).
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBScanRequest} the request
 */
export function request(ctx) {
  const { id } = ctx.source;

  return { 
      operation: "Scan",
      filter: {
          expression: `contains ( authors, :id)`,
          expressionValues: util.dynamodb.toMapValues( { ':id': id } )
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
