// item ekleme
// item çıkarma

import React, { createContext, useState } from 'react';

// item quantity güncelleme
export interface CartItem {
	// state üzerinde taşınacak olan verimiz
	quantity: number;
	productId: number;
	unitPrice: number;
	name: string;
}
export interface Cart {
	items: CartItem[];
	totalPrice: number;
}
// cart operasyonları ile ilgili tip bazlı bir arayüz sağlayacak
// useReducer kısmında tanımlanan state güncellememizi type bazlı yapan yapıya bir model oluşturmuş olduk.
export type CartContextType = {
	cart: Cart; // state
	addToCart(item: CartItem): void; // sepete item ekleme işlemi için gerekli action
	removeFromCart(productId: number): void;
	// updateQuantity(product: number, quantity: number): void; // size bıraktım.
	loadFromApi(items: CartItem[]): void;
};
// addToCart, removeFromCart, updateQuantity, loadFromApi state güncelleyecek olan aksiyonlarımız;
// cart güncel state sepet bilgimiz
export const CartContext = createContext<CartContextType | null>(null);
// provider useReducer daki süreci yöneten reducer özel fonksiyona benzete biliriz. burada global state gönetimini provider yapıları üstleniyor.
// useContext Hook ile CartContext üzerinden CartProvider üzerindeki işlemlere erişim sağlıyoruz.
const CartProvider = ({ children }: any) => {
	const initialCartState: Cart = { items: [], totalPrice: 0 };
	const [cart, setCart] = useState<Cart>(initialCartState);

	const addToCart = (item: CartItem) => {
		// state güncellemesi yaptık

		const itemExist = cart.items.find((x) => x.productId === item.productId);

		// client state mekanizmasında veriler apidan çekilmiş client tarafında işlenen veriler olmak zorundadır.

		if (itemExist) {
			// aynı üründen sepette varsa quantity değerini arttıracağız
			itemExist.quantity += 1;
			cart.items = [...cart.items];
		} else {
			cart.items = [...cart.items, item];
		}

		// total price state güncellediğimiz kısım.
		let total = 0;
		cart.items.forEach((item: CartItem) => {
			total += item.quantity * item.unitPrice;
		});

		cart.totalPrice = total;

		setCart({ ...cart }); // state güncellemeyi useState üzerinden yansıttık.
	};

	const removeFromCart = (productId: number) => {
		const filteredItems = cart.items.filter((x) => x.productId !== productId);
		cart.items = [...filteredItems];

		let total = 0;
		cart.items.forEach((item: CartItem) => {
			total += item.quantity * item.unitPrice;
		});

		cart.totalPrice = total;

		// state güncellemesi yapmuş olduk
		setCart({ ...cart });
	};

	const loadFromApi = (items: CartItem[]) => {
		// client state yapısında provider içerisinden axios ile veri çekilme işlemi yapmayı önermiyoruz.
		// veri çekildikten sonraki güncel data buraya aktarılarak client state güncellemesi yapılır.
		// web uygulama load olurken bu tarz verilern çekilip bu actionlar ile state'in server state üzerinden doldurulacağı en güzel yer App Component içerisinde useEffect Hook'udur.
		cart.items = [...items];

		let total = 0;
		cart.items.forEach((item: CartItem) => {
			total += item.quantity * item.unitPrice;
		});

		cart.totalPrice = total;

		setCart({ ...cart });
	};

	// value ile dışarıdan componentlerden çağırılacak olan actionlar ile guncel state bilgilerini girmemizi sağlar.
	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				loadFromApi,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
