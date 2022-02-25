import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { validateIp, addTileLayer, getAddress, addOffset, getUserIp } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const markerIcon = L.icon({
	iconUrl: icon,
	iconSize: [30, 40],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
	zoom: 15,
});
addTileLayer(map);

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
	if (validateIp(ipInput.value)) {
		getAddress(ipInput.value).then(setInfo);
	}
}

function setInfo({ ip, location, isp }) {
	const { lat, lng, country, region, timezone } = location;
	ipInfo.innerText = `${ip}`;
	locationInfo.innerText = `${country} ${region}`;
	timezoneInfo.innerText = `${timezone}`;
	ispInfo.innerText = `${isp}`;

	map.setView([lat, lng]);
	L.marker([lat, lng], { icon: markerIcon }).addTo(map);

	if (matchMedia('(max-width: 1023px)').matches) {
		addOffset(map);
	}
}

function handleKey(e) {
	if (e.key === 'Enter') {
		getData();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	getUserIp().then((ip) => getAddress(ip.ipAddress).then(setInfo));
});
