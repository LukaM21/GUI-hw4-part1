/*
 File: script.js
 Author: Luka Metias
 HW4 Part 1 – Validation with jQuery Validation Plugin
 Description: my javascript file for HW4 Part 1 that implements form validation using the jQuery Validation Plugin. 
 it generates a multiplication table based on user input for minimum and maximum row and column values.
*/

$(document).ready(function () {
    // Custom validation method to check if a value is greater than or equal to another value
    $.validator.addMethod("greaterThanOrEqualTo", function (value, element, param) {
        var target = $(param);
        if (this.settings.onfocusout) {
            target.off(".validate-greaterThanOrEqualTo").on("blur.validate-greaterThanOrEqualTo", function () {
                $(element).valid();
            });
        }
        return parseFloat(value) >= parseFloat(target.val());
    }, "The maximum value must be greater than or equal to the minimum value.");

    // Initialize form validation using jQuery Validation Plugin
    $("#form-container").validate({
        rules: {
            min_col_value: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            max_col_value: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThanOrEqualTo: "#min_col_value" // Custom validation to ensure max is greater or equal to min
            },
            min_row_value: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            max_row_value: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThanOrEqualTo: "#min_row_value" // Custom validation to ensure max is greater or equal to min
            }
        },
        messages: {
            min_col_value: {
                required: "Please enter a minimum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50."
            },
            max_col_value: {
                required: "Please enter a maximum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50.",
                greaterThanOrEqualTo: "Maximum column value must be greater than or equal to the minimum column value."
            },
            min_row_value: {
                required: "Please enter a minimum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50."
            },
            max_row_value: {
                required: "Please enter a maximum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50.",
                greaterThanOrEqualTo: "Maximum row value must be greater than or equal to the minimum row value."
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Place error messages right after each input field
        }
    });

    // Attach event listener for generating the table
    $("#generate-table-button").click(function (e) {
        e.preventDefault(); // Prevent page from reloading on error
        if ($("#form-container").valid()) {
            generateTable(); // Generate the table if form is valid
        }
    });
    function generateTable() {
    
        var minCol = parseInt($("#min_col_value").val());
        var maxCol = parseInt($("#max_col_value").val());
        var minRow = parseInt($("#min_row_value").val());
        var maxRow = parseInt($("#max_row_value").val());
    
        // Start generating the HTML content for the table
        var output = "<tr><th class='no-border'></th>"; // Create the top-left empty corner
    
        
        for (var col = minCol; col <= maxCol; col++) {
            output += "<th>" + col + "</th>";
        }
        output += "</tr>";
    
        
        for (var row = minRow; row <= maxRow; row++) {
            output += "<tr><th>" + row + "</th>";
            for (var col = minCol; col <= maxCol; col++) {
                output += "<td>" + (row * col) + "</td>";
            }
            output += "</tr>";
        }
    
        
        $("#mytable").html(output);
    }
    
});
