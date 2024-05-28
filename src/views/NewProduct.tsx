import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';
import { addProduct } from '../services/ProductService';
import ProductForm from '../components/ProductForm';

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  if (Object.values(data).includes('')) {
    return 'Todos los campos son obligatorios';
  }

  await addProduct(data);

  return redirect('/');
};

export default function NewProduct() {
  const error = useActionData() as string;

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>
          Registrar Producto
        </h2>
        <Link
          to='/'
          className='rounded-md bg-indigo-600 p-3 font-bold text-white hover:bg-indigo-500 shadow-md'
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMsg> {error} </ErrorMsg>}

      <Form className='mt-10' method='POST'>
        <ProductForm />
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          value='Registrar Producto'
        />
      </Form>
    </>
  );
}
