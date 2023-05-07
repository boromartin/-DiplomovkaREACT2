import React from "react";
import mqtt from "mqtt/dist/mqtt";

import { useEffect, useState } from "react";
import Senzor from "../components/DeviceStatus/DeviceStatus";

import devicesOBJ from "../BrowserObjects.json";

function Devices() {
	const [MQTTStatus, setMQTTstatus] = useState("");
	const [MQTTClient, setMQTTclient] = useState("");
	const [IsSub, setIsSub] = useState(false);

	const [devices, setdevices] = useState([]);

	useEffect(() => {
		if (MQTTClient) {
			//console.log(client)
			MQTTClient.on("connect", () => {
				setMQTTstatus("Connected");
				mqttSub("data/+");
			});
			MQTTClient.on("error", (err) => {
				console.error("Connection error: ", err);
				MQTTClient.end();
			});
			MQTTClient.on("reconnect", () => {
				setMQTTstatus("Reconnecting");
			});

			MQTTClient.on("message", (topic, message) => {
				setdevices(JSON.parse(message.toString()));
			});
		}
	}, [MQTTClient]);

	const mqttPublish = (device, MQTTData) => {
		let topic = "cmnd/" + device + "/" + MQTTData["Topic"];
		let qos = 1;
		console.log(topic + " " + MQTTData["Message"]);
		if (MQTTClient) {
			MQTTClient.publish(topic, MQTTData["Message"], { qos }, (error) => {
				if (error) {
					console.log("Publish error: ", error);
				}
			});
		} else {
			console.log("MQTT Connection error");
		}
	};

	const mqttConnect = (host) => {
		const options = {
			keepalive: 30,
			protocolId: "MQTT",
			protocolVersion: 4,
			clean: true,
			reconnectPeriod: 1000,
			connectTimeout: 30 * 1000,
			will: {
				topic: "WillMsg",
				payload: "Connection Closed abnormally..!",
				qos: 0,
				retain: false,
			},
			rejectUnauthorized: false,
		};

		const url = `ws://192.168.1.63:9001/mqtt`;
		setMQTTstatus("Connecting...");
		setMQTTclient(mqtt.connect(url, options));
	};

	const mqttSub = (topic, qos) => {
		if (MQTTClient) {
			MQTTClient.subscribe(topic, 0, (error) => {
				console.log("Wubscribed to topis:", topic);
				if (error) {
					console.log("Subscribe to topics error", error);
					return;
				}
				setIsSub(true);
			});
		}
	};

	return (
		<>
			<div className='Devices'>
				{!MQTTClient && <button onClick={mqttConnect}>Connect to MQTT</button>}
				{MQTTStatus && (
					<div>
						<div>Status: {MQTTStatus}</div>
					</div>
				)}
				{console.log(devices)}
				<h1 className='mt-20'>Devices: </h1>
				<div className='mt-4 flex flex-col gap-10'>
					{devices.map((device, deviceId) => {
						return (
							<div key={deviceId}>
								<Senzor mqttPublish={mqttPublish} device={device}></Senzor>
							</div>
						);
					})}
				</div>
				
			</div>
		</>
	);
}

export default Devices;
