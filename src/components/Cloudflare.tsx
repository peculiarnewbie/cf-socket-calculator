import { createEffect, createSignal } from "solid-js";
import Slider from "./Slider";
import { css } from "@tokenami/css";

export default function Cloudflare() {
	const [requestCount, setRequestCount] = createSignal(1);
	const [playerCount, setPlayerCount] = createSignal(100);
	const [averagePlayTime, setAveragePlayTime] = createSignal(1);
	const [requestPerPlayer, setRequestPerPlayer] = createSignal(1);
	const [processTimePerRequest, setProcessTimePerRequest] = createSignal(10);

	const [cfCost, setCfCost] = createSignal(0);
	const [unityCost, setUnityCost] = createSignal(0);

	const handlePlayerChange = (value: number) => {
		setPlayerCount(value);
		const requestCount = calculateRequestCount(
			value,
			averagePlayTime(),
			requestPerPlayer()
		);
		const cfCost = calculateCFCost(requestCount, processTimePerRequest());
		setRequestCount(requestCount);
		setCfCost(cfCost);

		const unityCost = calculateUnityCost(requestCount);
	};

	const calculateRequestCount = (
		playerCount: number,
		averagePlayTime: number,
		requestPerPlayer: number
	) => {
		return Math.ceil(
			(playerCount * averagePlayTime * requestPerPlayer * 3600) /
				10_000_000
		);
	};

	const calculateCFCost = (
		requestCount: number,
		processTimePerRequest: number
	) => {
		const requestCost = requestCount > 1 ? (requestCount - 1) * 0.15 : 0;

		const durationUnits = (processTimePerRequest * requestCount * 1000) / 8;
		const durationCost =
			durationUnits > 400_000
				? ((durationUnits - 400_000) * 12.5) / 1_000_000
				: 0;

		return requestCost + durationCost;
	};

	const calculateUnityCost = (requestCount: number) => {
		const totalTime = averagePlayTime() * playerCount() * 60;

		let billableTime = totalTime - 2_160_000;
		if (billableTime < 0) billableTime = 0;

		const timeCost = (billableTime * 0.16) / 43_200;
		let bandwithGib = requestCount;
		let bandwithCost = 0;
		if (bandwithGib < 150) bandwithGib = 0;
		else {
			bandwithCost = (bandwithGib - 150) * 0.16;
			console.log(bandwithCost, bandwithGib);
		}

		setUnityCost(timeCost + bandwithCost);
	};

	return (
		<div>
			<Slider
				value={playerCount()}
				setVaule={handlePlayerChange}
				label="Players"
				minValue={1}
				maxValue={100000}
			/>
			<Slider
				value={averagePlayTime()}
				setVaule={setAveragePlayTime}
				label="Avg Playtime (hours)"
				minValue={1}
				maxValue={20}
			/>
			<Slider
				value={requestPerPlayer()}
				setVaule={setRequestPerPlayer}
				label="Requests/player/sec"
				minValue={1}
				maxValue={60}
			/>
			<Slider
				value={processTimePerRequest()}
				setVaule={setProcessTimePerRequest}
				label="Process time (ms)"
				minValue={1}
				maxValue={100}
			/>
			<Slider
				value={requestCount()}
				setVaule={setRequestCount}
				label="Requests (millions)"
				minValue={1}
				maxValue={100000}
			/>

			<div
				style={css({
					"--display": "flex",
					"--width": "var(--size_full)",
					"--justify-content": "center",
				})}
			>
				<div
					style={css({
						"--width": 30,
					})}
				>
					<p>Cloudflare</p>
					<p>${cfCost().toFixed(2)} /month</p>
					<p>${parseFloat((cfCost() * 12).toFixed(2))} /year</p>
				</div>
				<div>
					<p>Unity Relay</p>
					<p>${unityCost().toFixed(2)} /month</p>
					<p>${parseFloat((unityCost() * 12).toFixed(2))} /year</p>
				</div>
			</div>
		</div>
	);
}
