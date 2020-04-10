/*function tryme(){
    alert("Hello");
    custmer=[];
   var data={
"id": 0,
"name": "string",
"dob": "string",
"gender": "string",
"status": "string",
"address": "string"
}
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
alert(xhttp.responseText);
customer=xhttp.responseText;
var html="<table border='1|1'>";
for(var i=0;i<customer.length;i++){
    html+="<tr>";
    html+="<td>"+customer[i].id+"</td>";
    html+="<td>"+customer[i].name+"</td>";
    html+="<td>"+customer[i].dob+"</td>";
    html+="<td>"+customer[i].gender+"</td>";
    html+="<td>"+customer[i].status+"</td>";
    html+="<td>"+customer[i].address+"</td>";
    html+='<td><button onclick="app.edit('+customer[i].id+')">Edit</button></td>';
    html+='<td><button onclick="app.edit('+customer[i].id+')">Delete</button></td>';
    html+="</tr>";
    document.getElementById("box").innerHTML=html;
}
// Typical action to be performed when the document is ready:
//document.getElementById("demo").innerHTML = xhttp.responseText;
}
};
xhttp.open("GET", "https://localhost:5001/api/Customer", true);
xhttp.send();
//xhttp.send(JSON.stringify(data));
}
function hello(){
    alert("Say Hello");
}*/


//###### USING FETCH API #####


var app = new function () {
    var url = "https://localhost:5001/api/Customer";
    customers = [];
    this.FetchAll = function () 
       {
        alert();
        fetch(url)
            .then((response) => {
                customers = response.json();
                // console.log(customers);
                return customers;

            }).then((customers) => {
                console.log(customers);

                var html = "<table border='1|1'>";
                html += "<th>ID</th>";
                html += "<th>CUSTOMERNAME</th>";
                html += "<th>GENDER</th>";
                html += "<th>DATEOFREGISTRATION</th>";
                html += "<th>PRODUCTS</th>";
                html += "<th>EMAILID</th>";
                html += "<th>LOCATION</th>";
                html += "<th>REFERREDBY</th>";
                for (var i = 0; i < customers.length; i++) {
                    html += "<tr>";
                    html += "<td>" + customers[i].id + "</td>";
                    html += "<td>" + customers[i].customerName + "</td>";
                    html += "<td>" + customers[i].gender + "</td>";
                    html += "<td>" + customers[i].dateOfRegistraton + "</td>";
                    html += "<td>" + customers[i].products + "</td>";
                    html += "<td>" + customers[i].emailId + "</td>";
                    html += "<td>" + customers[i].location + "</td>";
                    html += "<td>" + customers[i].referredBy + "</td>";
                    html += '<td><button onclick="app.edit(' + customers[i].id + ')">Edit</button></td>';
                    html += '<td><button onclick="app.delete(' + customers[i].id + ')">Delete</button></td>';
                    html += "</tr>";
                }
                html += "</table>";
                document.getElementById("box").innerHTML = html;
            });

    }
    // SaveAndUpdate
    this.SaveAndUpdate = function () {
        // alert();
        ((document.getElementById('Button').innerHTML == "Save") ? this.add() : this.update());
    }
    // Add
    this.add = function () {
        alert("Add");
        var id = 0;
        var customerName = document.getElementById("customerName").value;
        var g = document.getElementsByName("gender");
        var gender = "";
        for (var x = 0; x < g.length; x++) {
            if (g[x].checked)
                gender = g[x].value;
        };
        var dateOfRegistraton = document.getElementById("dateOfRegistraton").value;
        // var gender=document.getElementById("gender").value;
        // var d = document.getElementById("status");
        // var status= d.options[d.selectedIndex].value;
        //document.getElementById("status").value=status;
        var products = document.getElementById("products").value;
        var emailId = document.getElementById("emailId").value;
        var location = document.getElementById("location").value;
        var r =  document.getElementsByName("referredBy");
        var referredBy = "";  
        for (var x = 0; x < r.length; x++) {
            if (r[x].checked)
                referredBy = r[x].value;
        };     
        customerobj = {};
        customerobj.id = id;
        customerobj.customerName = customerName;
        customerobj.gender = gender;
        customerobj.dateOfRegistraton = dateOfRegistraton;
        customerobj.products = products;
        customerobj.emailId = emailId;
        customerobj.location = location;
        customerobj.referredBy = referredBy;
        alert(JSON.stringify(customerobj));

        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(customerobj)
        })
            .then((response) => {

                this.FetchAll();
                document.getElementById('id').value = '';
                document.getElementById('customerName').value = '';
                document.getElementsByName('gender').value = '';
                document.getElementById('dateOfRegistraton').value = '';
                document.getElementById('products').value = '';
                document.getElementById('emailId').value = '';
                document.getElementById('location').value = '';
                document.getElementsByName('referredBy').value = '';
            });
    }
    // Update  
    this.update = function () {
        alert();
        id = parseInt(document.getElementById('id').value);
        customerName = document.getElementById('customerName').value;
        var g = document.getElementsByName("gender");
        var gender = "";
        for (var x = 0; x < g.length; x++) {
            if (g[x].checked)
                gender = g[x].value;
        };
        //gender = document.getElementById('gender').value;
        dateOfRegistraton = document.getElementById('dateOfRegistraton').value;
        products = document.getElementById('products').value;
        emailId = document.getElementById('emailId').value;
        location = document.getElementById('location').value;
        var r =  document.getElementsByName("referredBy");
        var referredBy = "";  
        for (var x = 0; x < r.length; x++) {
            if (r[x].checked)
                referredBy = r[x].value;
        }; 
        // el1=document.getElementById('id');
        var updateobj = JSON.stringify({ "id": id, "name": customername, "gender": gender,"dateOfRegistraton": dateOfRegistraton, "products": products, "location": location,"referredBy":referredBy });

        fetch(url + "/" + updateindex, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },

            body: updateobj
        })
            .then((response) => {

                this.FetchAll();
                document.getElementById('id').value = '';
                document.getElementById('customerName').value = '';
                document.getElementsByName('gender').value = '';
                document.getElementById('dateOfRegistraton').value = '';
                document.getElementById('products').value = '';
                document.getElementById('emailId').value = '';
                document.getElementById('location').value = '';
                document.getElementsByName('referredBy').value = '';
            });
        updateindex = 0;
        document.getElementById('Button').innerHTML = "Save";

    }
    // Edit
    this.edit = function (id) {
        alert(id);
        document.getElementById('Button').innerHTML = "Update";

        fetch(url + "/" + id, { method: 'GET' })
            .then(function (response) {
                if (response.ok) {
                    return response.json(); 
                }
            })
            .then(function (updates) {
                alert(JSON.stringify(updates));
                updateindex = updates.id;
                document.getElementById('id').value = updates.id;
                document.getElementById('customerName').value = updates.customerName;
                //document.getElementById('gender').value = updates.gender;
                var g = document.getElementsByName("gender");
                //var gender = "";
                for (var x = 0; x < g.length; x++) {
                    if (g[x].value==updates.gender)
                     g[x].checked=true;
                }
                document.getElementById('dateOfRegistraton').value = updates.dateOfRegistraton;
                document.getElementById('products').value = updates.products;
                document.getElementById('emailId').value = updates.emailId;
                document.getElementById('location').value = updates.location;
                var r =  document.getElementsByName("referredBy");
               // var referredBy = "";  
                   for (var x = 0; x < r.length; x++) {
                   if (r[x].value==updates.referredBy)
                    r[x].checked=true;
        };

                // updateindex = i + 1;
            })
    }

    // delete
    this.delete = function (deleteid) {
        alert(deleteid);
        // url = "https://localhost:5001/api/Users/" + deleteid;
        fetch(url + "/" + deleteid, {
            method: 'delete',
            // mode: 'cors',
            // redirect: 'follow'
        }).then((response) => {

            this.FetchAll();
        });
    }
}
