import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import debounce from './debouncing';

function DebouncingSample() {
	const [searchText, setSearchText] = useState<string>('');
	const [products, setProducts] = useState<any[]>([]);
	const loadData = async () => {
		// const search = searchText || ''; // state olduğu durumlarda ilk yüklemede state değerleri undefined olarak yüklendiği için kontrol ettik.
		// const search = searchText ?? ''; c# daki karşılığı
		axios
			.get(
				`https://services.odata.org/northwind/northwind.svc/Products?$filter=substringof('${searchText}',ProductName)`
			)
			.then((response) => {
				console.log('response', response);
				setProducts([...response.data.value]);
			});
	};
	useEffect(() => {
		loadData();
	}, [searchText]);

	const onSearch = (e: any) => {
		// burada debouncing işlemi yapılmalıdır. serverside search olması sebebi ile performansı etkileyici bir kullanım şekli.
		setSearchText(e.target.value);
		console.log('search', e.target.value);
	};

	// 500 ms içerisinde kullanıcı ne kadar karakter yazarsa ona göre bir işlem yapmış olacağız.
	const searchDebouncingHandler = useMemo(() => debounce(onSearch, 500), []);

	return (
		<div style={{ padding: '10px' }}>
			<input onChange={searchDebouncingHandler} placeholder="Product Search" />
			<hr></hr>
			<ul>
				{products.map((item: any) => {
					return <li key={item.ProductID}>{item.ProductName}</li>;
				})}
			</ul>
		</div>
	);
}
export default DebouncingSample;
