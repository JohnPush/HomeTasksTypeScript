declare module "sort-by" {
  type FilterFunction = (arg: any) => boolean;
  type TypeFilterFunction = (type: string) => FilterFunction;

  type SortFunction = (a: any, b: any) => number;
  type MapFunction = (property: string, value: any) => any;

  type SortByFunction = (...args: (string | MapFunction)[]) => SortFunction;

  const type: TypeFilterFunction;
  const sort: (property: string, map?: MapFunction) => SortFunction;
  const sortBy: SortByFunction;

  export = sortBy;
}
