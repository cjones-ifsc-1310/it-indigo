function calculate() {
    console.log("CALCULATE CLICKED");

    if ($("#myform").valid()) {

        let fromValue = $("#FromValue").val();
        let fromUnit = $('input[name="FromUnit"]:checked').val();
        let toUnit = $('input[name="ToUnit"]:checked').val();

        // extra safety (in case validation misses radios)
        if (!fromUnit) {
            $("#FromUnitError").text("From Unit is required");
            return;
        } else {
            $("#FromUnitError").text("");
        }

        if (!toUnit) {
            $("#ToUnitError").text("To Unit is required");
            return;
        } else {
            $("#ToUnitError").text("");
        }

        // 🔥 AJAX CALL
        $.ajax({
            url: "https://brucebauer.info/assets/ITEC3650/unitsconversion.php",
            type: "GET",
            data: {
                FromValue: fromValue,
                FromUnit: fromUnit,
                ToUnit: toUnit
            },
            success: function (response) {
                console.log("Server response:", response);
                $("#ToValue").html(response);
            },
            error: function () {
                $("#ToValue").html("Error performing conversion.");
            }
        });
    }
}
function clearform() {
    console.log("CLEAR CLICKED");

    // clear text input
    $("#FromValue").val("");

    // clear result
    $("#ToValue").html("");

    // clear radio buttons
    $('input[name="FromUnit"]').prop("checked", false);
    $('input[name="ToUnit"]').prop("checked", false);

    // clear error messages
    $(".error").text("");

    // reset validation
    $("#myform").validate().resetForm();
}
$(document).ready(function () {
    $("#myform").validate({
        rules: {
            FromValue: {
                required: true,
                number: true
            },
            FromUnit: {
                required: true
            },
            ToUnit: {
                required: true
            }
        },
        messages: {
            FromUnit: "From Unit is required",
            ToUnit: "To Unit is required"
        },

        // 👇 THIS is what fixes your issue
        errorPlacement: function (error, element) {
            if (element.attr("name") === "FromUnit") {
                error.appendTo("#FromUnitError");
            } else if (element.attr("name") === "ToUnit") {
                error.appendTo("#ToUnitError");
            } else {
                error.insertAfter(element);
            }
        }
    });
});