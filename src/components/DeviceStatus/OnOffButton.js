import React from "react";

export default function OnOffButton({ isOn, onClick, children }) {
	return (
		<button className={`${isOn ? "button-on" : "button-off"} `}>
			{isOn ? "ON" : "OFF"}
		</button>
	);
}
