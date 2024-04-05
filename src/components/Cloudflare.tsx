import { createEffect, createSignal } from "solid-js";
import Slider from "./Slider";

export default function Cloudflare() {
	const [requestCount, setRequestCount] = createSignal(1);
	const [playerCount, setPlayerCount] = createSignal(100);
	const [averagePlayTime, setAveragePlayTime] = createSignal(1);
	const [playerPerRoom, setPlayerPerRoom] = createSignal(0);

	const [cfCost, setcfCost] = createSignal(0);
	const [unityCost, setUnityCost] = createSignal(0);

	createEffect(() => {
		let requestCost = (requestCount() - 1) * 0.15;
		if (requestCost < 0) requestCost = 0;

		requestCost = parseFloat(requestCost.toFixed(2));
		setcfCost(requestCost);

		let totalTime = averagePlayTime() * playerCount() * 60;
		let billableTime = totalTime - 2_160_000;
		if (billableTime < 0) billableTime = 0;

		let unityCost = (billableTime * 0.16) / 43_200;
		unityCost = parseFloat(unityCost.toFixed(2));
		setUnityCost(unityCost);
	});

	return (
		<div>
			<Slider
				value={requestCount()}
				setVaule={setRequestCount}
				label="Requests (millions)"
				minValue={1}
				maxValue={1000}
			/>
			<Slider
				value={playerCount()}
				setVaule={setPlayerCount}
				label="Players"
				minValue={1}
				maxValue={100000}
			/>
			<Slider
				value={averagePlayTime()}
				setVaule={setAveragePlayTime}
				label="Avg Playtime (hours)"
				minValue={1}
			/>
			<p>Cloudflare</p>
			<p>${cfCost()} /month</p>
			<p>${parseFloat((cfCost() * 12).toFixed(2))} /year</p>
			<p>Unity</p>
			<p>${unityCost()} /month</p>
			<p>${parseFloat((unityCost() * 12).toFixed(2))} /year</p>
		</div>
	);
}
