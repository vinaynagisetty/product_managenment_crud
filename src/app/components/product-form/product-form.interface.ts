import { Product } from '../../models/product.model';

export interface ProductFormState {
  product: Product;
  editing: boolean;
}

export interface ProductFormProps {
  onSubmitSuccess?: () => void;
  initialProduct?: Product;
}