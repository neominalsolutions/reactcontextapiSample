// bekletmeli işlem yapmamnıza olan sağlayan bir servis.
// genelede network istekleri atılırken kullanılan bir teknik
// fazladan mnetwork request oluşmaması açısında arama,filtereleme,sayfalama gibi serverside işlemlerde tercih edilir.

const debounce = (fn: Function, ms = 300) => {
	let timeOutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeOutId);
		timeOutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export default debounce;
