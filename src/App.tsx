import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Slider } from "@kobalte/core";
import Cloudflare from "./components/Cloudflare";

const App: Component = () => {
	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<Cloudflare />
			</header>
		</div>
	);
};

export default App;
