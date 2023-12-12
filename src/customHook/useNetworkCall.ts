// bu hook ile network isteklerinin merkezi olarak yönetilmesini sağlayacağız.
// axios ile gelen isteklerin arasına girip (middleware,interceptor) request,response pipelan'a isteğin merkezi olarak loglanmasını sağlayacağız.

import axios, { AxiosHeaders } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import debounce from '../debouncing/debouncing';
const useNetwork = (
	baseUrl: string, // farklı apilere call edebiliriz
	endPoint: string, // api baseUrl sonunda istek atacağımız endpoint
	debouncingTime: number = 500,
	headers?: AxiosHeaders // istek atarken gönderilecek olan header değerleri
) => {
	const [data, setData] = useState<any>(); // api dan gelecek response tutucağımız state
	const [error, setError] = useState<any>(); // error state
	const [loading, setLoading] = useState<boolean>(false);
	const [isFetching, setIsFetcing] = useState<boolean>(false); // istek devam ediyor mu state buradan alabiliriz.
	const [fetched, setFetched] = useState<boolean>(false);

	const axiosInstance = axios.create({
		baseURL: baseUrl,
		timeout: 5000, // 5sn içerisinde veri dönmez ise timeout düş
	});
	// request atmadan önce bazı header değerlerin request içerisine gömebiliriz.
	axiosInstance.interceptors.request.use(
		function (config) {
			const token = localStorage.getItem('accessToken');

			if (token) {
				console.log('token', token);
				config.headers = config.headers.setAuthorization(`Bearer ${token}`);
			}
			// her bir istek için araya girip eğer token varsa header buradan merkezi olarak set eder. Access token gönderme işlemi developerdan alınır

			console.log('api request atılmadan öncesi', config);
			setIsFetcing(true); // request ilk başlangıç isFetching true
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
	// response ile oynayıp uygulama genelinde base bir custom response type oluştrabiliriz.
	axiosInstance.interceptors.response.use(
		function (config) {
			console.log('apidan response döndüldükten sonra', config);
			setLoading(false);
			setIsFetcing(false);
			// request bittiği için isFetching False yaptık.
			// window.alert('İşlem tamamlandı');
			// return config;

			return config.data;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
	const fetchData = async () => {
		// veri çekme işlemini yaptığımız async method
		console.log('fetchData');
		try {
			const response = await axiosInstance.get(`${baseUrl}/${endPoint}`, {
				headers: headers,
			});
			console.log('response', response);
			// hata kodunu denemek için böyle bir işlem yaptık
			//throw new Error('Network Error');
			setData(response); // state set oldu
		} catch (error: any) {
			console.log('err1', error);

			setError({ message: error?.message });
		}
	};

	// gereksiz yere function tetiklenmemisi için useMemo ile debouncing işlemini memoisation yaptık
	const fetchDebounceHandler = useMemo(
		() =>
			debounce(() => {
				console.log('debounce');
				fetchData();
			}, debouncingTime),
		[]
	);

	useEffect(() => {
		// doma ilk basıldığı anda async veri çekme işlemini başlattığımız hook
		fetchDebounceHandler(); // doma girerken network call başlatık ama  debouncingTime göre bekleyip çalışacaktır. böyle sayfaya her giriş çıkışta berlirli bir saniye sonra tetiklenecek.
		setLoading(true);
		// setFetched(false);
	}, []); // url değişiminde farklı bir network call işlemi yap.

	// datanın değişimini state bastığımız an state asenkron olduğundan datanı state basıldığındna emin olduğumuz anda fetched değerini set ettik.
	useEffect(() => {
		// datanın state basıldığı an doğru bir fetch anı oluyor
		setFetched(true);
	}, [data]);

	return [data, error, loading, isFetching, fetched]; // data çekildikten sonra dönen response
};
export default useNetwork;
