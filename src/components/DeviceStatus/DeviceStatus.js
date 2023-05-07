import React, { useEffect, useState } from "react";
import Relay from "./Relay";
import Thermometer from "./Thermometer";

import moment from "moment";

export default function Senzor({ device, mqttPublish }) {
	var deviceType = "";
	if (device.DeviceType === "POW316" || device.DeviceType === "DUALR3") {
		deviceType = "relay";
	} else {
		deviceType = "thermometer";
	}
	const [trackTime, settrackTime] = useState(
		moment().diff(moment(device.Time), "seconds")
	);
	useEffect(() => {
		const int = setInterval(() => {
			settrackTime(moment().diff(moment(device.Time), "seconds"));
		}, 1000);

		return () => {
			clearInterval(int);
		};
	}, [device]);

	return (
		<div className='bg-gray-100 rounded-md shadow-sm p-6'>
			<h1 className=''>{device.DeviceName}</h1>
			<div className='mt-1 text-gray-500'>Device ID: {device.DeviceID}</div>
			<div className='mb-1 mt-1 text-gray-500'>
				Device Type: {device.DeviceType}
			</div>

			<div className='mb-5'>
				Last measurement: {moment(device.Time).format("HH:mm:ss")} ({trackTime}{" "}
				s dozadu)
			</div>
			{deviceType === "relay" && (
				<Relay device={device} mqttPublish={mqttPublish}></Relay>
			)}

			{deviceType === "thermometer" && (
				<Thermometer device={device} mqttPublish={mqttPublish}></Thermometer>
			)}

		</div>
	);
}
