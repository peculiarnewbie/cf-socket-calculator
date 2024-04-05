import { createEffect, createSignal } from "solid-js";
import Slider from "./Slider";

export default function Cloudflare() {
	const [requestCount, setRequestCount] = createSignal(1);
	const [playerCount, setPlayerCount] = createSignal(0);
	const [playerPerRoom, setPlayerPerRoom] = createSignal(0);

	const [cost, setCost] = createSignal(0);

	createEffect(() => {
		let requestCost = (requestCount() - 1) * 0.15;
		if (requestCost < 0) requestCost = 0;

		requestCost = parseFloat(requestCost.toFixed(2));
		setCost(requestCost);
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
			/>
			<p>${cost()} /month</p>
			<p>${parseFloat((cost() * 12).toFixed(2))} /year</p>
		</div>
	);
}
