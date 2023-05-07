import React from "react";
import DeviceChartDHT from "../Charts/DeviceChartDHT";

export default function Thermometer({ device, mqttPublish }) {
	return (
		<div>
			<div className='flex flex-row gap-8'>
				{device.Template.MonitoredVariables.map((MonVariable, varId) => {
					return (
						<div
							key={varId}
							className='p-4 bg-blue-500 text-white rounded-md shadow-lg text-center min-w-[150px] min-h-[150px] flex flex-col justify-center items-center'
						>
							<div className=''>
								<h2>
									{parseFloat(device.Data[MonVariable.Name]).toFixed(2)}{" "}
									<span>{MonVariable.DisplayUnit}</span>
								</h2>
							</div>
							<div>{MonVariable.Name}</div>
						</div>
					);
				})}
			</div>
			<DeviceChartDHT device={device}></DeviceChartDHT>
		</div>
	);
}
