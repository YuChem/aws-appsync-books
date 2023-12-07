import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id } = ctx.args;
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ id }),
  };
}

export function response(ctx) {
  ctx.stash.parent = ctx.result;
  return ctx.result;
}
