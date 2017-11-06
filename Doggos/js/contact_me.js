// Skript som kontrollerar kontaktformuläret

$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Error-meddelanden
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // Tillåter ej default submit
            // Hämtar värden som skrivits in i kontaktformuläret
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; 
            // Kollar om förnamnet innehåller mellanrum
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // AJAX-funktion för att kontrollera inskrivna värden
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Meddelande vid ett lyckat skickat meddelande
                    $('#success').html("<div class='alert alert-success'>"); // Skapar en alert för success
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;") // Knapp för att stänga alert
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Ditt meddelande har skickats. </strong>"); // Alert som visas efter meddelande skickats
                    $('#success > .alert-success')
                        .append('</div>');

                    // Rensar rutorna efter skick
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Meddelande vid ej lyckat skickat meddelande pga serverfel
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Vi ber om ursäkt " + firstName + ", vi har problem med vår epost-server. Försök gärna igen senare!");
                    $('#success > .alert-danger').append('</div>');
                    // Rensar formuläret
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function() {
    $('#success').html('');
});
