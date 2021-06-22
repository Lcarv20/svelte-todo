import { Tasks } from "../store";

export function localStorageInit() {
	// Verify storage
	if (typeof Storage === "undefined") {
		alert(
			"Your browser does not support localStorage, which affects the functionality of this app"
		);
		return {};
	}

	// Retrieve and parse item
	if (localStorage.getItem("todosData")) {
		const retrievedData = dataFromStorage(
			localStorage.getItem("todosData") || "{}"
		);
		console.log("data retrieved");
		return retrievedData;
	}
	// Create Item and return
	else {
		localStorage.setItem("todosData", "{}");
		return {};
	}
}

function dataFromStorage(data: string) {
	let dataHolder = {};
	let jsonData = JSON.parse(data);
	for (const i in jsonData) {
		dataHolder[i] = new Tasks(jsonData[i].notDone, jsonData[i].done);
	}

	return dataHolder;
}
