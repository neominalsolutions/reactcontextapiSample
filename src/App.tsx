import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, useRoutes } from 'react-router-dom';
import path from 'path';
import DebouncingSample from './debouncing/DebouncingSample';
import Layout from './layout/Layout';

function App() {
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
			],
		},
	]);
}

export default App;
