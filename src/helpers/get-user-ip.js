export async function getUserIp() {
	const response = await fetch(`https://api.db-ip.com/v2/free/self`);

	return await response.json();
}
// https://api.db-ip.com/v2/free/self
