import React from "react";
import {useState, useEffect} from "react"

export default function OnOffButton({ isOn, onClick, children }) {
	const [loading, setloading] = useState(false)
	function handleClick(){
		onClick()
		setloading(true)
	}
	useEffect(() => {
		setloading(false)
	}, [isOn])
	
	return (
		<button onClick={handleClick} disabled={loading} className={`${isOn ? "button-on" : "button-off"} `}>
			{!loading ? 
				<>
					{isOn ? "ON" : "OFF"}
				</>
				: 
				<>
					{isOn ? "Switching OFF" : "Switching ON"}
				</>
			}
		</button>
	);
}
