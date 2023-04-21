import { Components } from "antd/lib/date-picker/generatePicker";
import React from "react";

import Devices from "./containers/Devices";
import Charts from "./containers/Charts";

function App() {
	return (
		<div className='max-w-[1300px] mx-auto mt-10 mb-10'>
			{/* <HookMqtt></HookMqtt> */}
			<Charts></Charts>
			<Devices></Devices>
			{/*<Charts></Charts>*/}
		</div>
	);
}

export default App;
