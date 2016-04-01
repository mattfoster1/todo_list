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
var hotSeat;


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
    	compState: 0,
    	show: true,
    	info1: formToStore1.value, 
    	info2: formToStore2.value, 
    	info3: formToStore3.value,
    	Priority: formToStore4.value, 
    	Timestamp: formToStore5,
    	
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

		//pulls info from localStorage, then push it to divs in .html page
	for (s = 0; s < maxSerialNo && s < 10; s++) {
		console.log("______" + "loop" + s + "______");  
		s1 = s;

		if (localStorage.getItem("stringData" + s) === undefined || localStorage.getItem("stringData" + s) === null) { //TASK - invert 'if' to have if (localStorage.getItem("stringData" + s)). This is the opposite of ...===null. will be neater.
				d++;
		} else {
				//Retrieve string and parse (make an object again)
			var parsedData = JSON.parse(localStorage.getItem("stringData" + s));//this should be fed into the main array
					//push all objects to mainTodoArray
				mainTodoArray.push(parsedData);
			t = JSON.stringify(s);

			if (mainTodoArray[s]["show"] === true) {
				document.getElementById("id" + t).style.display = "block";
				document.getElementById("td" + t).style.display = "block";
				document.getElementById("tck" + t).style.display = "block";
				document.getElementById("dlt" + t).style.display = "block";
				document.getElementById("sav" + t).style.display = "block";
				// console.log(document.getElementById("sav" + t).style.display);			
			} else {
				document.getElementById("id" + t).style.display = "none";
				document.getElementById("td" + t).style.display = "none";
				document.getElementById("tck" + t).style.display = "none";
				document.getElementById("dlt" + t).style.display = "none";
				document.getElementById("sav" + t).style.display = "none";
				// console.log(document.getElementById("sav" + t).style.display);			
			}

			if (mainTodoArray[s] == null) {
				d--;
				console.log("Data null 2, D = " + d);
			} else {
					//pulls appropriate content out of array, pushes to DOM
		    	document.getElementById("td" + t).innerHTML = mainTodoArray[s]["info1"];
				document.getElementById("id" + t).innerHTML = mainTodoArray[s]["name"] // NB eventually IDs can just be hidden or changed to a variable

					//shows if item has been tapped as 'done'
				if (mainTodoArray[t]["compState"] === 1) {
					document.getElementById("td" + t).style.color = "lightgray";
					document.getElementById("td" + t).style.setProperty("text-decoration", "line-through");
					document.getElementById("tck" + t).src="images/checked_checkbox.png";
					document.getElementById("tck" + t).style.opacity="0.5";
					document.getElementById("td" + t).contentEditable = false;
				
				} else if (mainTodoArray[t]["compState"] == null) {	
					document.getElementById("tck" + t).src = "images/unchecked_checkbox.png";
					document.getElementById("tck" + t).style.opacity = "0";
					console.log("null");

				} else if (mainTodoArray[t]["compState"] === 0) {
					document.getElementById("td" + t).style.color = "black";
					document.getElementById("td" + t).style.setProperty("text-decoration", "none");
					document.getElementById("tck" + t).src="images/unchecked_checkbox.png";
					document.getElementById("tck" + t).style.opacity="1";
					document.getElementById("td" + t).contentEditable = true;
				}
			}
		}
	}

};

var tdoClick = function(tdo) {
	
	h = document.getElementById("id" + tdo).innerHTML;
	// console.dir("h = " + h);
	if (mainTodoArray[h] == undefined) {
		console.log("undefined");
		return;
	}
	else if (mainTodoArray[h]["compState"] === 0) {
		mainTodoArray[h]["compState"] = 1;
	} else if (mainTodoArray[h]["compState"] === 1) {
		mainTodoArray[h]["compState"] = 0;
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
	mainTodoArray[dt]["show"] = false;
	var k = JSON.stringify(mainTodoArray[dt]);
	localStorage.setItem("stringData" + dt, k);
	console.log("delete clicked");
	retrieveAllData();    	
};

var resetData = function() {
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
	//shows save buttons
var showSav = function(sv) {
	document.getElementById("savs").style.display = "block";
	var y =  document.getElementsByClassName("sav");
	for (z = 0; z < mainTodoArray.length; z++) {
		y[z].style.display = "block";
	}
	for (x=0; x < mainTodoArray.length; x++) {
		document.getElementById("sav" + x).style.opacity = "0.1";		
	}
	document.getElementById("sav" + sv).style.opacity = "1";
	document.getElementById("sav" + sv).style.display = "block";
	document.getElementById("savs").style.display = "block"; //can't remember what this does
	document.getElementById("mask1").style.display = "block";
	retrieveAllData();
	hotseat = sv;
}
	//save any user edits
var saveEdit = function(sv1) {
	mainTodoArray[sv1]["info1"] = document.getElementById("td" + sv1).innerHTML;
	localStorage.setItem("stringData" + sv1, JSON.stringify(mainTodoArray[sv1]));
	document.getElementById("mask1").style.display = "none";
	document.getElementById("sav" + sv1).style.display = "none";
	document.getElementById("savs").style.display = "none";
	console.log("Edit Saved");
	retrieveAllData();
}
	//reverts to content before edit. Hides save buttons.
var cancelEdit = function() {
	for (x=0; x < mainTodoArray.length; x++) {
		document.getElementById("sav" + x).style.display = "none";
		document.getElementById("td" + x).innerHTML = mainTodoArray[hotseat]["info1"];
		document.getElementById("mask1").style.display = "none";
			//hides wide div they are in
		document.getElementById("savs").style.display = "none";
	}
	retrieveAllData();
	console.log("Edit Cancelled");
}

var keypress = function(e) {
	console.log(e);
	if (e.keycode == 13) {
		console.log("keypress ret")
		saveEdit();
	} else if (e.keycode == 27) {
		console.log("keypress esc");
		cancelEdit();
	}
	console.log("keypress");
	console.log(e);
}

var n = 0;
var hh;
var ww;
var contScal;
var featCont = document.getElementsByClassName("featCont");

var id11;
var showFeatures = function() {
	interval1 = setInterval(feat, 10);
	console.log("click");
	document.getElementById("feat1").style.height = "0px";
	document.getElementById("feat1").style.width = "0px";
	document.getElementById("feat1").style.display = "block";
}



var feat = function() {
	hh = document.getElementById("feat1").style.height;
	ww = document.getElementById("feat1").style.width;
	ll = document.getElementById("feat1").left;
	

	if (document.getElementById("feat1").style.height >= "80%" || document.getElementById("feat1").style.width >= "70%") {
		clearInterval(interval1);
		
	} else {
		document.getElementById("feat1").style.height = parseInt(hh) + 5 + "%";
		document.getElementById("feat1").style.width = parseInt(ww) + 5 + "%";
		
		n++;
	}
	if (document.getElementById("feat1").style.height >= "30%" || document.getElementById("feat1").style.width >= "30%") {
		for (n=0; n < featCont.length; n++) {
			featCont[n].style.display = "block";
			// console.log("op = " + featCont[n].style.display);
		}
	}
}

var hideFeat = function() {
	interval2 = setInterval(hideFeat2, 5);
	console.log("close clicked");
	console.log("close___");

}

var hideFeat2 = function() {
	hh = document.getElementById("feat1").style.height;
	ww = document.getElementById("feat1").style.width;


	if (document.getElementById("feat1").style.height <= "0%" || document.getElementById("feat1").style.width <= "0%") {
	document.getElementById("feat1").style.display = "none";
	clearInterval(interval2);
	// console.log("interval2 cleared");
		
	} else {
		document.getElementById("feat1").style.height = parseInt(hh) - 2 + "%";
		document.getElementById("feat1").style.width = parseInt(ww) - 2 + "%";

		n++;
		// console.log("else");
	}
		//hides feat content when page gets too small
	if (document.getElementById("feat1").style.height <= "30%" || document.getElementById("feat1").style.width <= "30%") {
		for (n=0; n < featCont.length; n++) {
			featCont[n].style.display = "none";
			// console.log("op = " + featCont[n].style.display);
		}
	}

	
	
}


var showSummary = function() {
}

// var jQCheck = function() {
// 	if (window.jQuery) {
// 		console.log("__jQuery Yes__");
// 	} else {
// 		console.log("- - jQuery No - -");
// 	}
// }

// var lukesCrap = function() {<><>var makeTodoItem = function(title, completed, timestamp) {<><>return {<><>timestamp: timestamp || Date.now(),<><>title:title ||'',<><>completed: !!completed<><>};<><>}
