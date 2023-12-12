import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, useRoutes } from 'react-router-dom';
import path from 'path';
import DebouncingSample from './debouncing/DebouncingSample';
import Layout from './layout/Layout';
import CustomHookSample from './customHook/CustomHookSample';
import ContextApiSample, { Product } from './contextapi/ContextApiSample';
import CartSummary from './contextapi/CartSummary';
import useNetwork from './customHook/useNetworkCall';
import {
	CartContext,
	CartContextType,
	CartItem,
} from './contextapi/CartProvider';
import axios from 'axios';

function App() {
	// eğer kendi custom hook yapımızı kurar ve değerleri dizi olarak dışarı çıkarırsak burdaki sıralama önemlidir. ona göre doğru sırada yazalım.
	const [data, error, loading, isFetching, fetched] = useNetwork(
		'https://services.odata.org/northwind/northwind.svc',
		'Products?$format=json'
	);

	const { loadFromApi } = useContext(CartContext) as CartContextType;

	useEffect(() => {
		console.log('fetch api data for global state');
		// mobile uygulama için ise en doğru yer splash screen, açılış ekranı
		console.log('cartData', data);
		console.log('cartData-fetched', fetched);

		if (fetched) {
			// data fetch olduğuna emin olduğumuz anda (asenkron çalıştığımız için emin olmalıyız.)
			console.log('cartData', data);
			const items: CartItem[] = (data as any)?.value?.map((product: any) => {
				return {
					productId: product.ProductID,
					name: product.ProductName,
					quantity: 1,
					unitPrice: product.UnitPrice,
				} as CartItem;
			});

			console.log('items', items);
			// global state güncellemesini tetikledik.
			loadFromApi(items);
		}
	}, [data]);

	return useRoutes([
		{
			// element: (
			// 	<>
			// 		<p>Layout</p>
			// 		<Outlet />
			// 	</>
			// ),
			// element: (
			// 	<Layout>
			// 		{/* aşağıdaki kısım children görevi görür. */}
			// 		<h1>Başlık</h1>
			// 		<p>Slider</p>
			// 	</Layout>
			// ),
			path: '/',
			Component: Layout,
			children: [
				{
					path: 'debouncing',
					Component: DebouncingSample,
				},
				{
					path: 'customHook',
					Component: CustomHookSample,
				},
				{
					path: 'contextapi',
					Component: ContextApiSample,
				},
				{
					path: 'cartSummary',
					Component: CartSummary,
				},
			],
		},
	]);
}

export default App;
