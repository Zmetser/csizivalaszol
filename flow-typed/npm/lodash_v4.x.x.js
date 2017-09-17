declare module 'lodash/last' {
  declare function last<T>(array: ?Array<T>): T;

  declare module.exports: typeof last
}

declare module 'lodash' {
  declare class Lodash {
    last: $Exports<'lodash/last'>
  }

  declare var exports: Lodash;
}
