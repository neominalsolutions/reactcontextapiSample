import React from 'react';
import useNetwork from './useNetworkCall';
import { AxiosHeaders } from 'axios';

function CustomHookSample() {
	// birden fazla state durumunu kendi custom hook üzerinden yakalamaya çalışacak şekilde array deconstruction işlemi yaptık.

	// const header = new AxiosHeaders();
	// header.setAuthorization('Bearer X-Token');

	const [data, error, loading, isFetching] = useNetwork(
		'https://jsonplaceholder.typicode.com/',
		'posts',
		300
	);

	const [data2, error2, loading2] = useNetwork(
		'https://jsonplaceholder.typicode.com/',
		'todos'
	);

	console.log('data', data);
	console.log('error', error);
	console.log('loading', loading);
	console.log('isFetching', isFetching);

	console.log('data2', data2);

	if (loading) {
		return <>...loading</>;
	} else if (error !== undefined) {
		return <>{error?.message}</>;
	} else {
		return (
			<div>
				{data && ( // data undefined değilse git datayı doma bas
					<>
						{data?.map((item: any) => {
							return <div key={item.id}>{item.title}</div>;
						})}
					</>
				)}
			</div>
		);
	}
}

export default CustomHookSample;
