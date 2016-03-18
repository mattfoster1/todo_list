/* Plan:
	- Delete item (item by item)
	- Rename/edit item
	- Sorting options
	- Archive */

var serialNo = 0; //keeps track of each Todo
var topSerialNo = 0; //keeps track of total number of serial numbers in use
var btnAddJS;
var retrievedObject;
var mainTodoArray = [1];
var maxSerialNo = localStorage.getItem("maxSerialNo"); //TASK - this needs to be called from localStorage each time
// console.log("maxSerialNo = " + maxSerialNo);
var dataInObject = {}
var data1 = {}//temp contains objects 
var data2 = {}
var todo1 = "";
var t;
var h = 0;


var start = function() {
	// console.log("         NOTICE: start() function triggered");

		// setup for 'new Todo' button
	var btnAddJS = document.getElementById("btnadd");
	maxSerialNo = localStorage.getItem("maxSerialNo");
	// console.log("maxSerialNo = " + maxSerialNo);
	console.dir(localStorage);
	
	if ((typeof maxSerialNo == "undefined") || (maxSerialNo === null)) {
		maxSerialNo = 0;
	} else {
		retrieveAllData();
	};
};

var store = function() { //triggers when clicking custom store button
	var d = new Date();

		//Pull content from input fields (DOM)
	// console.log("           NOTICE: store(); triggered");
    var formToStore1 = document.getElementById("formcontent1");
    var formToStore2 = document.getElementById("formcontent2");
    var formToStore3 = document.getElementById("formcontent3");
    var formToStore4 = document.getElementById("priority");
    var formToStore5 = d.getTime();
    // console.log("formToStore1,2,3 = " + formToStore1.value  + ", " + formToStore2.value + ", " + formToStore3.value);

    if (formToStore1.value === "") {
    	formToStore1.value = "<<{ Invalid Entry }>>";
    };

    //Build an object (to be stringified)
    data1 = {
    	name: maxSerialNo,
    	info1: formToStore1.value, 
    	info2: formToStore2.value, 
    	info3: formToStore3.value,
    	Priority: formToStore4.value, 
    	Timestamp: formToStore5,
    	State: 0,
    };

    //Stringify and store
    var x = JSON.stringify(data1);
    localStorage.setItem("stringData" + maxSerialNo, x);
    
    incrementMaxSerialNo();
    	// storeMaxSerialNo();

    retrieveAllData();
};



	//retrieve data, put into array
var retrieveAllData = function() {
	// console.log("        NOTICE: retrieveAllData(); triggered");
	console.log("--------------------------------------")
	mainTodoArray = [];
	todo1 = "";
	console.log("maxSerialNo = " + maxSerialNo);
	var d = 0;

		//Clears out last load of data, otherwise it duplicates
	// document.getElementById("todolist").innerHTML = null;

		//pulls info from localStorage, then push it to divs in .html page
	for (s = 0; s < maxSerialNo; s++) { //will this work without defining a variable? surely === should become =
		console.log("______" + "loop" + s + "______");  
		s1 = s;
		// t = JSON.stringify(s1);

		// console.log(localStorage.getItem("stringData" + s));

		if (localStorage.getItem("stringData" + s) === undefined || localStorage.getItem("stringData" + s) === null) {
				
				// s1--;
				d++;
				console.log("Data null 1, D = " + d);

		} else {
				//Retrieve string and parse (make an object again)
			var parsedData = JSON.parse(localStorage.getItem("stringData" + s));//this should be fed into the main array
				// console.log(parsedData);
					//push all objects to mainTodoArray
				mainTodoArray.push(parsedData);
				// console.log(mainTodoArray);
				// console.log(parsedData);

			t = JSON.stringify(s);

			// console.log(t);
			
			console.log(mainTodoArray);
			console.log(s);
			// console.log(s1);


			if (mainTodoArray[s] == null) {
				d--;
				console.log("Data null 2, D = " + d);
			} else {
					//pulls appropriate content out of array, pushes to DOM
		    	document.getElementById("td" + t).innerHTML = mainTodoArray[s]["info1"];
				document.getElementById("id" + t).innerHTML = mainTodoArray[s]["name"] // NB eventually IDs can just be hidden or changed to a variable

					//shows if item has been tapped as 'done'
				if (mainTodoArray[t]["State"] === 1) {
					document.getElementById("td" + t).style.color = "lightgray";
					document.getElementById("td" + t).style.setProperty("text-decoration", "line-through");
				} else {
					document.getElementById("td" + t).style.color = "black";
					document.getElementById("td" + t).style.setProperty("text-decoration", "none");
				}
			}
		}
	}

};

var td0Click = function(tdo) {
	
	h = document.getElementById("id" + tdo).innerHTML;
		
	// console.dir("h = " + h);
	if (mainTodoArray[h]["State"] === 0) {
		mainTodoArray[h]["State"] = 1;
	} else if (mainTodoArray[h]["State"] === 1) {
		mainTodoArray[h]["State"] = 0;
	} else {
		console.log("inversion didnae work ________");
	}
	//Stringify and restore updated data
	var i = JSON.stringify(mainTodoArray[h]);
	localStorage.setItem("stringData" + h, i);

	retrieveAllData();
};

var dltclick = function(dt) {
	var j = document.getElementById("id" + dt).innerHTML;

	// mainTodoArray.splice(dt,1);
	// delete mainTodoArray[dt];
	localStorage.removeItem("stringData" + dt) //NB this will only work on the first page of todos once pageswitching is implemented
	
	// console.dir(mainTodoArray);
	console.log("delete clicked");

	// var k = JSON.stringify(mainTodoArray);
	// localStorage.setItem("stringData" + j, k);

	// location.reload();

	retrieveAllData();    	
};

var resetData = function() {
	// console.log("resetData");
	maxSerialNo = 0;
	localStorage.setItem("maxSerialNo", maxSerialNo);
	localStorage.clear();
	location.reload();
};

var incrementMaxSerialNo = function() {
	maxSerialNo++;
	console.log("maxSerialNo = " + maxSerialNo);
	localStorage.setItem('maxSerialNo', maxSerialNo);
	console.dir(localStorage);
};

var storeMaxSerialNo = function() {
	localStorage.setItem('maxSerialNo', maxSerialNo);
}

// var jQCheck = function() {
// 	if (window.jQuery) {
// 		console.log("__jQuery Yes__");
// 	} else {
// 		console.log("- - jQuery No - -");
// 	}
// }

// var lukesCrap = function() {<><>var makeTodoItem = function(title, completed, timestamp) {<><>return {<><>timestamp: timestamp || Date.now(),<><>title:title ||'',<><>completed: !!completed<><>};<><>}
