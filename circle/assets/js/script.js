
 "use strict";

        $( "#CircleForm" ).validate({

        });
        
        function getdiameter(radius) {
            return radius * 2;}
            function getcircumference(radius) {
                return 2 * Math.PI * radius;}
                function getarea(radius) {
                    return Math.PI * radius * radius;}

        function calculate()
        {
            // if the form is valid, then make the calculations
            if ($("#CircleForm").valid()) {
                
                 document.getElementById("diameter").innerHTML = "";
                 document.getElementById("circumference").innerHTML = "";
                 document.getElementById("area").innerHTML = "";

                 let radius; // string representation of the radius
                 let radiusfp; // floating point value of radius
                 let diameter;  // floating point diameter
                 let circumference;  // floating point circumference
                 let area;  // floating point area

                 // read in the radius as a string
                 radius = document.getElementById("radius").value;
                

                 // Convert numbers from strings to Floating Point
                 radiusfp = parseFloat( radius ); 

                 // calculate the diameter
                 diameter = getdiameter(radiusfp);

                 // calculate the circumference
                 circumference = getcircumference(radiusfp);

                 // calculate the area
                 area = getarea(radiusfp);

                 // display the diameter
                 document.getElementById("diameter").innerHTML = diameter.toString();

                 // display the circumference
                 document.getElementById("circumference").innerHTML = circumference.toString();

                 // display the area
                 document.getElementById("area").innerHTML = area.toString();
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
 