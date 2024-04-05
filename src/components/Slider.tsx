import { Slider as KSlider } from "@kobalte/core";
import { css } from "@tokenami/css";

export default function Slider(props: {
	value: number;
	setVaule: (value: number) => void;
	label: string;
	minValue?: number;
	maxValue?: number;
}) {
	const setValues = (value: number[]) => {
		props.setVaule(value[0]);
	};

	return (
		<div
			style={css({
				"--display": "flex",
				"--flex-direction": "column",
				"--overflow-y": "auto",
				"--align-items": "center",
				"--padding": 4,
			})}
		>
			<KSlider.Root
				style={css({
					"--position": "relative",
					"--display": "flex",
					"--flex-direction": "column",
					"--align-items": "center",
					"--user-select": "none",
					"--touch-action": "none",
					"--width": 50,
				})}
				value={[props.value]}
				onChange={setValues}
				minValue={props.minValue}
				maxValue={props.maxValue}
			>
				<div
					style={css({
						"--width": "var(--size_full)",
						"--display": "flex",
						"--justify-content": "space-between",
						"--padding-bottom": 2,
					})}
				>
					<KSlider.Label>{props.label}</KSlider.Label>
					<KSlider.ValueLabel />
				</div>
				<KSlider.Track
					style={css({
						"--background-color": "var(--color_overlay)",
						"--position": "relative",
						"--border-radius": "var(--radii_full)",
						"--height": 2,
						"--width": "var(--size_full)",
					})}
				>
					<KSlider.Fill
						style={css({
							"--position": "absolute",
							"--background-color": "var(--color_cf)",
							"--border-radius": "var(--radii_full)",
							"--height": "var(--size_full)",
						})}
					/>
					<KSlider.Thumb
						style={css({
							"--display": "block",
							"--width": 4,
							"--height": 4,
							"--background-color": "var(--color_cf)",
							"--border-radius": "var(--radii_full)",
							"--top": "var(---, -4px)",
							"--hover_box-shadow": "var(--shadow_cf)",
							"--focus_box-shadow": "var(--shadow_cf)",
							"--focus_outline": "none",
						})}
					>
						<KSlider.Input />
					</KSlider.Thumb>
				</KSlider.Track>
			</KSlider.Root>
		</div>
	);
}
