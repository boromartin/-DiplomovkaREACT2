import { Components } from "antd/lib/date-picker/generatePicker";
import React from "react";
import "./App.css";

import Devices from "./containers/Devices";
import Charts from "./containers/Charts";

function App() {
	return (
		<>
			{/* <HookMqtt></HookMqtt> */}
			<Charts></Charts>
			<Devices></Devices>
			{/*<Charts></Charts>*/}
		</>
	);
}

export default App;
