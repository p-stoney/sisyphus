export interface FilterOption {
  label: string;
  value: string;
}

export interface DFilterCriteria {
  allInvoicesPaid?: boolean;
  distributorName?: string;
}

export interface IFilterCriteria {
  paid?: boolean;
  pending?: boolean;
  distributorName?: string;
  id?: string;
}
