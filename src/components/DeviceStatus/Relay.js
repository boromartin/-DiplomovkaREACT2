import React, { useState } from "react";
import OnOffButton from "./OnOffButton";

export default function Relay({ device, mqttPublish }) {
	const ContVariable = device.Template.ControlledVariables;
	const [displayAll, setdisplayAll] = useState(false);
	return (
		<div>
			<div className='grid grid-cols-3 gap-10 mb-6 mt-4'>
				{device.Template.ControlledVariables.map((ContVariable, varId) => {
					return (
						<div key={varId} className='p-4 bg-gray-200 rounded-md shadow-lg'>
							<h3 className='mb-1'>{ContVariable.Name}</h3>
							<div className=''>Príkon: {device.Data[`Power${varId + 1}`]}</div>
							<div className='mb-2'>
								Status: {device.Data[ContVariable.Name]}
							</div>

							<OnOffButton
								isOn={device.Data[ContVariable.Name]}
								onClick={() =>
									mqttPublish(device.DeviceName, ContVariable.MQTT)
								}
							/>
						</div>
					);
				})}
			</div>

			<div>
				<button
					onClick={() => {
						setdisplayAll(!displayAll);
					}}
				>
					Všetky dáta
				</button>
				{displayAll && (
					<div className='flex flex-col gap-1 mt-4 bg-gray-200 p-4 rounded-md'>
						{device.Template.MonitoredVariables.map((MonVariable, varId) => {
							return (
								<div key={varId}>
									<span className='font-medium'>{MonVariable.Name}</span>:{" "}
									{device.Data[MonVariable.Name]} {MonVariable.DisplayUnit}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
