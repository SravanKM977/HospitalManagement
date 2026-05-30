export interface TableColumn {
  header: string;
  field: string;
  type?: 'text' | 'date' | 'currency' | 'badge';
}
