

console.log("Called");

// axios.get('https://reqres.in/api/users?page=2')
// .then((res)=> console.log(res))
// .catch((err)=> console.log(err));



// $("#contactme-form").on("submit", function (event) {
//     console.log("Submit button click");
   
// });

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

$("#contactme-form").on("submit", function (event) {
 console.log("Javascript called");

 var formData = $("#contactme-form").serializeArray();
 var formSubmit = objectifyForm(formData);
 var simplified = JSON.stringify(formSubmit);
 console.log(simplified);

 axios.post('https://130kcncfh2.execute-api.us-east-1.amazonaws.com/v1/callstepfunction', 
{
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    ,
    //"input": "{\"sendername\": \"Sujit\",\"emailaddress\": [\"shafiqcs516@dispostable.com\"],\"telephone\": \"phone\",\"sendersubject\": \"subject\",\"sendermessage\":\"comment\"}",
    "stateMachineArn": "arn:aws:states:us-east-1:717879216935:stateMachine:SMForEmailSend",
    "input": simplified
})
  .then((response) => {
    console.log("shafiq - OK");
    //alert("Your Requested Submitted Successfully ");
    console.log(response);

    document.getElementById("submit_response").innerHTML = "Request has been successfully saved";
    document.getElementById("contactme-form").reset();
    
  })
  .catch( (error) => {
    console.log("shafiq - error");
    //alert("Ops !!! Failed to Submit. Retry again...");
    document.getElementById("submit_response").innerHTML = "Unknown Error Happened. Please try again";
    console.log(error);
  });
  return false;
});

