var fields = document.querySelectorAll('input[name="email"], input[data-type*="email"], input[type*="email"], input[placeholder*="email"], input[aria-label*="email"], input[data-name*="Email"]');
fields.forEach(function (field) {
    field.addEventListener('change', function () {
        var em = field.value || $('input:visible[name="email"]').val();
        console.log('field changed', em);
        var properties = {
            "customProperties": {
                "user_traits": {
                    "t": "Object",
                    "v": {
                        "email": {
                            "t": "string",
                            "v": em || $('input:visible[name="email"]').val()
                        },
                        "first_name": {
                            "t": "string",
                            "v": $('input:visible[name="first_name"], input:visible[type="first_name"], input:visible[aria-label="first_name"], input:visible[name="Name"], input:visible[data-name="Name"], input:visible[aria-label*="Name"]').val()
                        },
                        "last_name": {
                            "t": "string",
                            "v": $('input:visible[name="last_name"], input:visible[type="last_name"], input:visible[aria-label="last_name"]').val()
                        },
                        "phone": {
                            "t": "string",
                            "v": $('input:visible[name="phone"], input:visible[type="phone"], input:visible[aria-label="phone"], input:visible[type="tel"]').val()
                        }
                    }
                },
                "identify_by_email": {
                    "t": "string",
                    "v": em,
                    "ib": true
                }
            }
        };
        _cl.identify(properties);
    });
});