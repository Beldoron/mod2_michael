$.getJSON("states.json", function(data) {
    console.log(data);
    var states = data;

    $.each(states, function(i, e) {
        var option = $("<option>");
        option.text(states[i].code).appendTo("#StatesOne")

    })


})









// -------------------------------------//



var congress = $("#content").data("congress"); // senate or house?

var jsonURL = "pro-congress-113-" + congress + ".json" // build my json url

var members = [];

$.getJSON(jsonURL, function(values) {

    console.log(values.results[0].members);

    members = values.results[0].members



    buildTable()

})



// wird als erstes ausgeführt wenn eine checkbox in der id filter angeclickt wird
// JQUERYselector spricht die checkbox an und guckt ob true/false (wird als console log angezeigt)
$("#filter input[type=checkbox]").on("change", function() {
    console.log("checkbox change");

    tgifFilter.update($(this).val(), $(this).prop("checked")) // die funktion update wird mit der var tgifilter ausgeführt
}) // this value = steht dabei für die Party, kann in meinem Fall Demo,Indie oder Repo sein
// und this.prop (property) guckt ob die checkbox gecheckt ist oder nicht (true/false)

///////// __________________________________________________ //////////////


$("#StatesOne").on("change", function() {
    console.log("checkbox change");

    tgifFilter.updateStates($(this).val())
})



function Filter() {

    this.Demo = true;
    this.Repo = true;
    this.Indie = true;
    this.States = "";

    this.update = function(party, checked) { // die update funktion bekommt die parameter parter(party für R,D oder I und ob checked true or false ist)
        console.log("should update parties now...", party, checked)

        this[party] = checked;
        // if (party == "Demo") { //wenn dann innerhalb dieser Funktion party (z.B. Demo) == Demo ist, dann wird die if funktion ausgeführt (bei der geguckt wird ob Demo = true ist)
        //     if (checked) {
        //         this.Demo = true
        //     } else {
        //         this.Demo = false
        //     }
        // }

        // if (party == "Repo") {
        //     if (checked) {
        //         this.Repo = true
        //     } else {
        //         this.Repo = false
        //     }
        // }

        // if (party == "Indie") {
        //     if (checked) {
        //         this.Indie = true
        //     } else {
        //         this.Indie = false
        //     }
        // }
        buildTable() // dann wird die buildtable funktion ausgeführt
    }
    this.shouldShowMember = function(member) {

        // console.log("checking if we should show", member.first_name, member.last_name, member.party)
        // console.log(member.party)
        // console.log(this[member.party])
        switch (member.party) { //die ShowMember Funktion bekommt den parameter member und guckt sich dabei die party des members an
            case "D":
                return this.Demo // wenn D (für Demo) dann return Demo der dann in der buildTable funktion genutz wird)
                break;
            case "I":
                return this.Indie
                break;
            case "R":
                return this.Repo
                break;
            default:
                return true
                break;
        }


    }

    this.updateStates = function(state) {
        this.States = state;
        console.log(this.States)
        buildTable();

    }



}





var tgifFilter = new Filter();

console.log(tgifFilter);


function buildTable() {

    // console.log("should build the table now...");

    var tableRows = [];


    for (var i = 0; i < members.length; i++) {
        if (tgifFilter.shouldShowMember(members[i])) { //die buildTable Funktion führt mit dem var die shouldshow funktion aus (mit member von i)
            if (tgifFilter.States == members[i].state || tgifFilter.States == "")  {
                var tr = $("<tr>");
                var middle = (members[i].middle_name == null) ? "" : members[i].middle_name;
                var fullName = (members[i].first_name + " " + middle + " " + members[i].last_name)
                tr.append($("<td>").html($("<a>").attr("href", members[i].url).text(fullName)));
                tr.append($("<td>").text(members[i].party));
                tr.append($("<td>").text(members[i].state));
                tr.append($("<td>").text(members[i].seniority));
                tr.append($("<td>").text(members[i].votes_with_party_pct + "%"));
                tableRows.push(tr);
            }
        }
    }
    $('#politiciansTable').html(tableRows);
}
















































// ------------------------------------- //

// this.buildTable = function() {

//     var table = $("#politiciansTable tbody");

//     var tableRows = [];
//     $.each(this.members, function(i, member) {

//         // console.log(member.party) // R D or I
//      //    console.log(tgifFilter[member.party])
//         // valid?
//         if( tgifFilter.shouldShowMember(member) ) {

//             var tr = $("<tr>");
//             var fullname = [member.first_name, member.middle_name, member.last_name].join(" ").replace("  ", " ")
//             tr.append($("<td>").text( fullname));
//             tr.append($("<td>").text(member.party));
//             tableRows.push(tr);
//         } 
//     })
//     table.append(tableRows);
// }

// this.updateTable = function(){

//     $("#politiciansTable tbody").html("");
//     this.buildTable();
// }







// ------------------------------------- //


///////// __________________________________________________ //////////////





























// function buildTable(members) {

//  console.log("should build the table now...");


//    var tableRows = [];


//     for (var i = 0; i < members.length; i++) { // for (var i in members)
//         // var thead = $("<th>")
//         // tr.append($("th").text("test"));
//         // tr.append($("th").text("Party"));
//         // tr.append($("th").text("State"));
//         // tr.append($("th").text("Seniority"));
//         // tr.append($("th").text("Votes for"));

//         var tr = $("<tr>");




//             // different approach to define middle name for append
//             // function name(i,arr) {
//             //         if (arr[i].middle_name == null) {
//             //             return ""
//             //             }   else { return arr[i].middle_name}

//             //         }

//         var middle = (members[i].middle_name == null) ? "" : members[i].middle_name ;

//         tr.append($("<td>").text(members[i].first_name + " " + middle + " " + members[i].last_name));


//         tr.append($("<td>").text(members[i].party));
//         tr.append($("<td>").text(members[i].state));
//         tr.append($("<td>").text(members[i].seniority));
//         tr.append($("<td>").text(members[i].votes_with_party_pct + "%")); 

//         tableRows.push(tr);

//     }

//     console.log(tableRows)
//     $('#politiciansTable').append(tableRows);
// }





// function Filter (){

//     this.D = true;
//     this.R = true;
//     this.I = true;

//     this.activeState = "";

//     this.updateParty = function(party, checked) {
//         console.log("should update parties now...", party, checked)


//         // if(party == "D"){
//         //  if(checked){
//         //      this.D = true
//         //  } else{
//         //      this.D = false
//         //  }
//         // }

//         // ..better
//         this[party] = checked;



//         dataHandler.updateTable();

//     }

// }
// var tgifFilter = new Filter();

// console.log(tgifFilter);


// var fullName = [];

// $.each(members, function(i, member){

//     var tr = $("<tr>");

//     tr.append( $("<td>").text(member.first_name) );

//     tr.append( $("<td>").text(member.party) );

//     tableRows.push(tr);

// })



// table.append(tableRows);






















































// OLD STUFF !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //


// var table = $("#politiciansTable");



// var tableRows = [];

// $.each(members, function(i, member){

//     var tr = $("<tr>");

//     tr.append( $("<td>").text(member.first_name) );

//     tr.append( $("<td>").text(member.party) );

//     tableRows.push(tr);

// })



// table.append(tableRows);
























// var members = 
//     function puschTable(members) {
//        var tableRows = [];

//         for (var i = 0; i < members.length; i++) { // for (var i in members)

//             var tr = $("<tr>");

//             tr.append($("<td>").text(members[i].first_name));

//             tr.append($("<td>").text(members[i].party));

//             tableRows.push(tr);

//         }
//         return tableRows
//         console.log(tableRows)
//     }


// function createTable(members) {



//     for (var i = 0; i < members.length; i++) {

//         var members = members[i];



//     }


// function buildTable(members) {

//  console.log("should build the table now...");





//  for (var i = 0; i < members.length; i++) {

//   var member = members[i];

//   console.log(member.first_name)

//  }



//  var table = $("#politiciansTable");



//  var tableRows = [];

//  $.each(members, function(i, member){

//      var tr = $("<tr>");

//      tr.append( $("<td>").text(member.first_name) );

//      tr.append( $("<td>").text(member.party) );

//      tableRows.push(tr);

//  })



//  table.append(tableRows);



// }


// var tableRows = [];

// $.each(members, function(i, member) {

//     var tr = $("<tr>");

//     tr.append($("<td>").text(member.first_name));

//     tr.append($("<td>").text(member.party));

//     tableRows.push(tr);

// })

// var table = $("#politiciansTable");

// table.append(tableRows);











// $("#politiciansTable").append(tableRows);



//     full name, built from the array element fields for last, first, and middle names
//     party (D, R, or I)
//     state (two letter code)
//     seniority (years in the office they currently hold)
//     percentage of votes with party, with a % added











// //  OOP WAY





// function DataHandler(){



//  this.jsonURL = "";

//  this.chamber = ""; // sentate or house

//  this.rawData = "";

//  this.members = [];



//  this.init = function(){

//      this.chamber = $("body").data("congress"); // senate or house?

//      this.jsonURL = "data/congress-113-" + this.chamber + ".json";

//  }



//  this.loadJsonFile = function(){

//      var that = this;

//      $.getJSON(this.jsonURL,function (response) {

//          that.rawData = response;

//          that.members = that.rawData.results[0].members;

//          that.buildTable();

//      })

//  }



//  this.buildTable = function(){



//      var table = $("#politiciansTable tbody");



//      var tableRows = [];

//      $.each(this.members, function(i, member){

//          var tr = $("<tr>");

//          tr.append( $("<td>").text(member.first_name) );

//          tr.append( $("<td>").text(member.party) );

//          tableRows.push(tr);

//      })

//      table.append(tableRows);

//  }





// }



// var dataHandler = new DataHandler();

// dataHandler.init();

// dataHandler.loadJsonFile();



// console.log(dataHandler)













// politicians = data.results[0].members
// var politicians = [];


// $(document).ready(function () {
//     $.getJSON(url,
//     function (json) {
//         var tr;
//         for (var i = 0; i < json.length; i++) {
//             tr = $('<tr/>');
//             tr.append("<td>" + json[i].User_Name + "</td>");
//             tr.append("<td>" + json[i].score + "</td>");
//             tr.append("<td>" + json[i].team + "</td>");
//             $('table').append(tr);
//         }
//     });
// });




//     full name, built from the array element fields for last, first, and middle names
//     party (D, R, or I)
//     state (two letter code)
//     seniority (years in the office they currently hold)
//     percentage of votes with party, with a % added


// 0: {id: "A000360", title: "Senator, 2nd Class", short_title: "Sen.", api_uri: "https://api.propublica.org/congress/v1/members/A000360.json", first_name: "Lamar", …}



// // 


// for (var i = Things.length - 1; i >= 0; i--) {
//  Things[i]
// }









// // Find a <table> element with id="myTable":
// var table = document.getElementById("myTable");

// // Create an empty <tr> element and add it to the 1st position of the table:
// var row = table.insertRow(0);

// // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1);

// // Add some text to the new cells:
// cell1.innerHTML = "NEW CELL1";
// cell2.innerHTML = "NEW CELL2"; 





// $.getJSON("/pro-congress-113-senate.json", function(information){
//      var tr;
//  for (var i = 0; i < JSON.length; i++ ) {
//      tr = $('<tr/>');
//          tr.append("<td>" + json[0].first_name + "</td>");

//  }

//  console.log('')
// $('table').append($(tr.join('')));


// });


// $(document).ready(function () {
//     $.getJSON(url,
//     function (json) {
//         var tr;
//         for (var i = 0; i < json.length; i++) {
//             tr = $('<tr/>');
//             tr.append("<td>" + json[i].User_Name + "</td>");
//             tr.append("<td>" + json[i].score + "</td>");
//             tr.append("<td>" + json[i].team + "</td>");
//             $('table').append(tr);
//         }
//     });
// });

// Functional - Procedural way...



// var congress = $("#content").data("congress"); // .data -> Daten in ein DOM element packen und lagern für später (das data element in der html datei hat dann den namen)

// var jsonURL = "pro-congress-113-" + congress + ".json" // hier wird die jason url zusammen gesetzt, in diesem fall "pro-congress-113-" + congress(und die var congress ist in dem div container #content abgelegt und als "data-congress steht da senate")

// $.getJSON(jsonURL, function(values) {


//     //callback funktion erst wenn wir die antwort vom server bekommen und da ist schon alles durchgelaufen

//     console.log(values.results[0].members)
//     var members = values.results[0].members


//        var tableRows = [];

//         for (var i = 0; i < members.length; i++) { // for (var i in members)

//             var tr = $("<tr>");

//             tr.append($("<td>").text(members[i].first_name));

//             tr.append($("<td>").text(members[i].party));

//             tableRows.push(tr);
//             return tableRows;
//         }

//         console.log(tableRows)
//         $('#politiciansTable').append(tableRows);













// $.getJSON("https://swapi.co/api/planets/1/", function(data, textStatus, jqXHR){
//  console.log('got a server response');
//  console.log(data);


//  $("#planetname").text (data.name)
//  });


// // ----------------------------- next day --------------------------//


// $.getJSON("hhtp://localhost:8080/senate.json", function(data){
//  console.log(data);
// })