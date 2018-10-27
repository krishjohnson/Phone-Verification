jQuery(document).ready(function(){
    jQuery("#verification-form").submit(function(e) {
        e.preventDefault();
        initiateCall();
    });
});

function initiateCall() {
    jQuery.post("twilio-helper.php", { phone_number : $("#phone_number").val() }, null, "json")
        .fail(
            function(data) {
                showErrors(data.errors);
            })
        .done(
            function(data) {
                showCodeForm(data.verification_code);
            })
    ;
    checkStatus();
}

function showErrors(errors) {
    jQuery("#errors").text(code);
}

function showCodeForm(code) {
    jQuery("#verification_code").text(code);
    jQuery("#verify_code").fadeIn();
    jQuery("#verification-form").fadeOut();
}

function checkStatus() {
    jQuery.post("check-status.php", { phone_number : $("#phone_number").val() },
        function(data) { updateStatus(data.status); }, "json");
}

function updateStatus(current) {
    if (current === "unverified") {
		jQuery("#status").append(".");
        setTimeout(checkStatus, 3000);
    }
    else {
        success();
    }
}

function success() {
    jQuery("#status").text("Verified!");
}