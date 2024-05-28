import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
  product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id) {
    await deleteProduct(+params.id);
  }
  return redirect('/');
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className='border-b '>
      <td className='p-3 text-lg text-gray-800'>{product.name}</td>
      <td className='p-3 text-lg text-gray-800'>
        {formatCurrency(product.price)}
      </td>
      <td className='p-3 text-lg text-gray-800'>
        <fetcher.Form method='POST'>
          <button
            type='submit'
            name='id'
            value={product.id}
            className={`${
              isAvailable ? 'text-black' : 'text-red-600'
            } rounded-lg p-2 text-xs font-bold  uppercase w-full border border-slate-200`}
          >
            {isAvailable ? 'Disponible' : 'No Disponible'}{' '}
          </button>
        </fetcher.Form>
      </td>
      <td className='p-3 text-lg text-gray-800 '>
        <div className='flex gap-2 items-center'>
          <button
            onClick={() => navigate(`/product/${product.id}/edit`)}
            className='bg-indigo-600 p-2 w-full text-white text-sm rounded-lg font-bold'
          >
            Editar
          </button>
          <Form
            method='POST'
            className='w-full'
            // Esto se realiza ya que el action por defecto toma la ruta actual dentro de la pagina
            action={`product/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm('¿Eliminar?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              className='bg-red-600 p-2 w-full cursor-pointer text-white text-sm rounded-lg font-bold'
              type='submit'
              value='Eliminar'
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
