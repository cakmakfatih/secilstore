export interface CollectionResponse {
  meta: PaginationMeta;
  data: Collection[];
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Collection {
  id: number;
  filters: FilterGroup;
  type: number;
  info: CollectionInfo;
  salesChannelId: number;
  products: null;
}

export interface FilterGroup {
  useOrLogic: boolean;
  filters: Filter[];
}

export interface Filter {
  id: string;
  title: string;
  value: string;
  valueName: string;
  currency: null | string;
  comparisonType: number;
}

export interface CollectionInfo {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
}
