import React, { useContext } from 'react';
import { CartContext, CartContextType, CartItem } from './CartProvider';

// /cartSummary
function CartSummary() {
	const { cart, removeFromCart } = useContext(CartContext) as CartContextType; // ortak olarak global state ulaştığımız yer.

	const onDeleteItem = (productId: number) => {
		const result = window.confirm('Silmek istediğinize emin misiniz?');
		if (result) {
			removeFromCart(productId);
		}
	};

	return (
		<div>
			{cart.items.map((item: CartItem) => {
				return (
					<div key={item.productId}>
						{item.name} x {item.quantity} = {item.unitPrice * item.quantity}{' '}
						<button onClick={() => onDeleteItem(item.productId)}>Sil</button>
					</div>
				);
			})}
			<div>Total Price: {cart.totalPrice}</div>
		</div>
	);
}

export default CartSummary;
