import React from "react";

export default function Senzor({device, mqttPublish }) {
	console.log(device)
	 return (
	 	<div>
	 		<h1>Name: {device.DeviceID}</h1>
			<h3>Time of measurement: {device.Time}</h3>
			<h3>Device Type: {device.DeviceType}</h3>
			{device.Template.ControlledVariables.map((ContVariable, varId) => {
				return (
					<button onClick={(() => mqttPublish(device.DeviceName, ContVariable.MQTT))}>{ContVariable.Name}: {device.Data[ContVariable.Name]}</button>
				);
			})}
			{device.Template.MonitoredVariables.map((MonVariable, varId) => {
				return (
					<h4>{MonVariable.Name}: {device.Data[MonVariable.Name]}</h4>
				);
			})}

			
	 	</div>
	 );
}
