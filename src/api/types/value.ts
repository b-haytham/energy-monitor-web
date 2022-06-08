export type LatestValue = {
  value: null | number;
  timestamp: null | string;
};

export type Value = {
  _id: string

  name: string

  description: string

  accessor: string

  unit: string

  latest_value: LatestValue

  createdAt: string

  updatedAt: string
}
