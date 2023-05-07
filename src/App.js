import { Components } from "antd/lib/date-picker/generatePicker";
import React from "react";

import Devices from "./containers/Devices";

function App() {
	return (
		<div className='max-w-[1300px] mx-auto mt-10 mb-10'>
			{/* <HookMqtt></HookMqtt> */}
		
			<Devices></Devices>
			{/*<Charts></Charts>*/}
		</div>
	);
}

export default App;
