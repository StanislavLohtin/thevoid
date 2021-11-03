export interface PurchaseDTO {
  Id: string;
  Description: string;
  Price: string;
  AmountPaid: string;
  Sale: { SaleDate: string };
}
