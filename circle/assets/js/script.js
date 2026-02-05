  "use strict";
  
  $(document).ready(function () {

    // Set up jQuery Validation
    $("#circleForm").validate({
        rules: {
            radius: {
                required: true,
                number: true,
                min: 0.0000001
            }
        },
        messages: {
            radius: {
                required: "Please enter a radius value.",
                number: "Please enter a valid number.",
                min: "Radius must be a positive number."
            }
        },
        submitHandler: function () {
            calculateCircle();
        }
    });

    // Calculate button
    $("#calculateBtn").click(function (e) {
        e.preventDefault();
        $("#circleForm").submit();
    });

    // Reset button
    $("#resetBtn").click(function () {
        clearForm();
    });
});

// Converts input and performs calculations
function calculateCircle() {
    let radiusStr = $("#radius").val();
    let radius = parseFloat(radiusStr);

    let diameter = calcDiameter(radius);
    let circumference = calcCircumference(radius);
    let area = calcArea(radius);

    $("#diameter").text(diameter.toFixed(2));
    $("#circumference").text(circumference.toFixed(2));
    $("#area").text(area.toFixed(2));
}

// Calculation functions
function calcDiameter(radius) {
    return radius * 2;
}

function calcCircumference(radius) {
    return 2 * Math.PI * radius;
}

function calcArea(radius) {
    return Math.PI * radius * radius;
}

// Clears input and results
function clearForm() {
    $("#radius").val("");
    $("#diameter").text("");
    $("#circumference").text("");
    $("#area").text("");
    $("#circleForm").validate().resetForm();
}




 "use strict";

        $( "#TriangleForm" ).validate({

        });
        
        function displayHypotenuse() {
            // if the form is valid, then make the calculations
            if ($("#TriangleForm").valid()) {
                
                 document.getElementById("hypotenuse").innerHTML = "";

                 let leg1; // string representation of the leg1
                 let leg1fp; // floating point value of leg1
                 let leg2; // string representation of the leg1
                 let leg2fp; // floating point value of leg1
                 let hypotenuse;  // floating point hypotenuse
                 let result; // displayable result

                 // read in the legs as a string
                 leg1 = document.getElementById("leg1").value;
                 leg2 = document.getElementById("leg2").value;

                 // Convert numbers from strings to Floating Point
                 leg1fp = parseFloat( leg1 ); 
                 leg2fp = parseFloat( leg2 ); 

                 // calculate the hypotenuse
                 hypotenuse = calcHypotenuse(leg1fp, leg2fp);

                 // display the hypotenuse
                 document.getElementById("hypotenuse").innerHTML = hypotenuse.toString();
            }
        }

          function calcHypotenuse (leg1value, leg2value)
          // returns hypotenuse of a right triangle
          // square root of leg1 squared plus leg2 squared
          {
              return Math.sqrt((leg1value*leg1value) + (leg2value*leg2value));
          }
          
          function clearForm()
        {
            document.getElementById("leg1").value = "";
            document.getElementById("leg1error").innerHTML = "";
            document.getElementById("leg2").value = "";
            document.getElementById("leg2error").innerHTML = "";
            document.getElementById("hypotenuse").innerHTML = "";
        }
 