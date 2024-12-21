import storage from "./storage";
import axiosInstance from "./axios";

export async function handleLogin({
	email,
	password,
}: { email: string; password: string }) {
	const response = await axiosInstance
		.post("/v1/users/authorize", {
			email,
			password,
		})
		.then(({ data }) => data);

	storage.setItem("minstagram-web", JSON.stringify(response));
	return;
}

export function handleLogout() {
	storage.clear();
}

export function checkAuthentication() {
	let isAuthorized = false;
	const storageItem = storage.getItem("minstagram-web");
	if (storageItem) {
		const { accessToken } = JSON.parse(storageItem) as { accessToken: string };
		if (accessToken) {
			isAuthorized = true;
		}
	}
	return isAuthorized;
}
