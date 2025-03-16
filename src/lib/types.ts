export type ConstantFilter = {
  id: string;
  title: string;
  value: string;
  valueName: string | null;
  currency: string | null;
  comparisonType: number;
};

export type ConstantFilters = {
  useOrLogic: boolean;
  filters: ConstantFilter[];
};

export type ConstantInfo = {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
};

export type ConstantItem = {
  id: number;
  filters: ConstantFilters;
  type: number;
  info: ConstantInfo;
  salesChannelId: number;
  products: any | null;
};

export type ConstantMeta = {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type SuccessfulConstantsResponse = {
  meta: ConstantMeta;
  data: ConstantItem[];
};

export type FailedResponse = {
  message: string;
};

export type ConstantsResponse = SuccessfulConstantsResponse | FailedResponse;
