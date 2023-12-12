import { useContext } from 'react';
import { CartContext, CartContextType, CartItem } from './CartProvider';

export interface Product {
	productId: number;
	productName: string;
	stock: number;
	price: number;
}
function ContextApiSample() {
	const data: Product[] = [
		{
			productId: 1,
			productName: 'Ürün-1',
			stock: 10,
			price: 10,
		},
		{
			productId: 2,
			productName: 'Ürün-2',
			stock: 12,
			price: 70,
		},
		{
			productId: 3,
			productName: 'Ürün-3',
			stock: 15,
			price: 100,
		},
	];

	// useContext hook global ContextAPI bağlantık. global state action ve güncel state değerlerine erişim sağladık.
	const { cart, addToCart } = useContext(CartContext) as CartContextType;

	const onAddCart = (item: Product) => {
		const cartItem: CartItem = {
			productId: item.productId,
			name: item.productName,
			quantity: 1,
			unitPrice: item.price,
		};
		// CartProvider'daki action tetikledik. bu state güncellemesi yapacak.
		addToCart(cartItem); // action dispatch edildi. state güncellemek için
	};

	return (
		<div>
			<h1>Ürünlerimiz</h1>
			{data.map((item: Product) => {
				return (
					<div key={item.productId}>
						<p>Ürün: {item.productName}</p>
						<p>Stok: {item.stock}</p>
						<p>Birim Fiyat: {item.price}</p>
						<div>
							<button onClick={() => onAddCart(item)}>Sepete Ekle</button>
						</div>
					</div>
				);
			})}
			<hr></hr>
			<div>
				<h1>Sepetteki Ürünler</h1>
				{cart.items.map((item: CartItem) => {
					return (
						<div key={item.productId}>
							{item.name} x {item.quantity}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ContextApiSample;
