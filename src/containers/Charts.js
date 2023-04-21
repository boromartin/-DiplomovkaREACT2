import axios from "axios";
import React from "react";

import { useEffect, useState, useCallback } from "react";

const baseURL = "http://localhost:6969/getChartData?age=5";

function Devices() {
	const [devices, setdevices] = useState([]);
	const [test, setTest] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			axios.get(baseURL).then((response) => {
				setdevices(response.data);
			});
			setTest(test + 1);
			console.log(devices);
		}, 1000);

		return () => clearInterval(interval);
	}, [test]);

	return (
		<>
			<div className='Devices'> asdf {test} </div>
		</>
	);
}

export default Devices;
