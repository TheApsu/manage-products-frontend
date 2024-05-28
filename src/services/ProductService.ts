import { safeParse } from 'valibot';
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from '../types';
import axios from 'axios';
import { toBoolean } from '../utils';

const _apiUrl = import.meta.env.VITE_API_URL;

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = async (data: ProductData) => {
  try {
    const { success, output } = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (success) {
      const url = `${_apiUrl}/api/products`;
      await axios.post(url, output);
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${_apiUrl}/api/products`;
    const { data } = await axios.get(url);
    const { success, output } = safeParse(ProductsSchema, data.data);
    if (success) {
      return output;
    } else {
      throw new Error('Hubo un error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id: Product['id']) => {
  try {
    const url = `${_apiUrl}/api/products/${id}`;
    const { data } = await axios.get(url);
    const { success, output } = safeParse(ProductSchema, data.data);
    if (success) {
      return output;
    } else {
      throw new Error('Hubo un error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (
  product: ProductData,
  id: Product['id']
) => {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: product.name,
      price: +product.price,
      availability: toBoolean(product.availability.toString()),
    });
    if (result.success) {
      const url = `${_apiUrl}/api/products/${id}`;
      const { data } = await axios.put(url, result.output);
      const { success } = safeParse(ProductSchema, data.data);
      if (success) {
        return true;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: Product['id']) => {
  try {
    await axios.delete(`${_apiUrl}/api/products/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const updateAvailability = async (id: Product['id']) => {
  try {
    await axios.patch(`${_apiUrl}/api/products/${id}`);
  } catch (error) {
    console.error(error);
  }
};
