import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// parent component içerisinde child component geçişi yapmak istersek,  children?: React.ReactNode; şeklinde bir props tanımlıyoruz.
/*
<Layout>
	<App />
	// App as children component 
</Layout>;

<Layout />;
*/

export type LayoutProps = {
	children?: React.ReactNode; // optional, herhangi bir jsx dosyası component react.Node olarak tanımlanabilir
};
function Layout({ children }: LayoutProps) {
	return (
		<div style={{ padding: '10px' }}>
			<nav>
				<Link to="/debouncing">Debouncing</Link> <Link to="/">Home</Link>{' '}
				<Link to="/customHook">Custom Hook</Link>{' '}
				<Link to="/contextapi">Context API</Link>{' '}
				<Link to="/cartSummary">Cart Summary</Link>{' '}
				{/* uygulama dışı linkler için tercih edilebilir. */}
				<a href="https://www.google.com">Google</a>
			</nav>
			<section>{children}</section>
			{/* section içerisine yukarıdaki örnek de App component geçer */}
			{/* buraya ekstradan bir jsx content props olarak gönderilebilir */}
			<main style={{ padding: '10px' }}>
				<Outlet />
				{/* seçilen sayfanın doma girmesini saylayan bir react router dom işaretleyicisi */}
			</main>

			<footer>Alt Bilgi</footer>
		</div>
	);
}
export default Layout;
