var interval;
var cid;

function clock() {
    clearInterval(interval);
    var startTime = Date.now();
    interval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        $('#timer').html((elapsedTime / 1000).toFixed(3));
    }, 100);
}

function validateIID(iid) {
    return iid.replace(/\D/g, '').trim();
}

function ValidateEmail(inputText) {
    var mailformat = /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})+$/;
    if (inputText.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function getcid(iid) {
    $.post("/Home/get", { installationID: iid, abc: $("#abc").val() })
        .done(function (ketqua) {
            if (ketqua.length === 48) {
                cid = ketqua
                $('#CID').val(ketqua);
                var CID1 = ketqua.substring(0, 6)
                var CID2 = ketqua.substring(6, 12)
                var CID3 = ketqua.substring(12, 18)
                var CID4 = ketqua.substring(18, 24)
                var CID5 = ketqua.substring(24, 30)
                var CID6 = ketqua.substring(30, 36)
                var CID7 = ketqua.substring(36, 42)
                var CID8 = ketqua.substring(42, 48)
                $('#CID-').val(CID1 + '-' + CID2 + '-' + CID3 + '-' + CID4 + '-' + CID5 + '-' + CID6 + '-' + CID7 + '-' + CID8);
                showAlert('success', "Get confirmation id success.");
            } else if (ketqua === "Server too busy.") {
                cid = ketqua;
                $('#CID').val(cid);
                $('#CID-').val(cid)
                showAlert('danger', cid);
            } else {
                cid = ketqua
                $('#CID').val(cid);
                $('#CID-').val(cid);
                showAlert('success', "Get confirmation id success.");
            }
            $("#InstallationID").removeAttr('disabled');
            $("#GetConfirmationID").removeAttr('disabled');
            $("#copyResult").removeAttr('disabled');
            $("#copyResult-").removeAttr('disabled');
            $("#optionVersion").removeAttr('disabled');
            $("#copyCMD").removeAttr('disabled');
            clearInterval(interval);
            checkcountget();
        })
        .fail(function () {
            showAlert('danger', "Cannot get confirmation id.");
            $('#CID').val("Cannot get confirmation id.");
            $('#CID-').val("Cannot get confirmation id.");
            $("#InstallationID").removeAttr('disabled');
            $("#GetConfirmationID").removeAttr('disabled');
            $("#copyResult").removeAttr('disabled');
            $("#copyResult-").removeAttr('disabled');
            $("#optionVersion").removeAttr('disabled');
            $("#copyCMD").removeAttr('disabled');
            clearInterval(interval);
        });

}
function checkcountget() {
    $.get("/Home/getcount")
        .done(function (ketqua) {
            $('#countget').html(ketqua);
        });
}

function registryKey(email, keytype) {
    $.post("/registry/dangky", {
        email: email,
        keytype: keytype,
        abc: $("#abc").val()
    })
        .done(function (ketqua) {
            showAlert('success', "Registry successful.");
            alert(ketqua);
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#registry").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
            clearInterval(interval);
        })
        .fail(function () {
            showAlert('danger', "Unable to connect to the server, please try again later!");
            alert("Unable to connect to the server, please try again later!");
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#registry").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
            clearInterval(interval);
        })
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
        showAlert('success', "Copy success.");
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function scriptCMD(optionVersion, cid) {
    if (optionVersion === "All Windows") {
        var cmdWindows = "set CID=" + cid + "\ncscript slmgr.vbs /atp %CID%\ncscript slmgr.vbs /ato\n";
        return cmdWindows;
    } else if (optionVersion === "All Office") {
        var cmdAllOffice = "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")\n"
        cmdAllOffice = cmdAllOffice + "if exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))\n"
        cmdAllOffice = cmdAllOffice + "set CID=" + cid + "\n"
        cmdAllOffice = cmdAllOffice + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        cmdAllOffice = cmdAllOffice + "cscript.exe OSPP.vbs /act\n"
        return cmdAllOffice;
    } else if (optionVersion === "Office 2010") {
        var Office2010 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office14\")\n"
        Office2010 = Office2010 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\")\n"
        Office2010 = Office2010 + "set CID=" + cid + "\n"
        Office2010 = Office2010 + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        Office2010 = Office2010 + "cscript.exe OSPP.vbs /act\n"
        return Office2010
    } else if (optionVersion === "Office 2013") {
        var Office2013 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office15\")\n"
        Office2013 = Office2013 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\")\n"
        Office2013 = Office2013 + "set CID=" + cid + "\n"
        Office2013 = Office2013 + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        Office2013 = Office2013 + "cscript.exe OSPP.vbs /act\n"
        return Office2013
    } else if (optionVersion === "Office 2016/2019") {
        var Office2016 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\")\n"
        Office2016 = Office2016 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\")\n"
        Office2016 = Office2016 + "set CID=" + cid + "\n"
        Office2016 = Office2016 + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        Office2016 = Office2016 + "cscript.exe OSPP.vbs /act\n"
        return Office2016
    } else {
        return ""
    }
}

function copycmd() {
    var cid = $("#CID").val();
    var copyText = $("#optionVersion :selected").text();
    if ((cid.length === 0) || (copyText === "Select version")) {
        showAlert('warning', "Please get confirmation id and select version.");
    } else {
        var confirmationid = validateIID(cid);
        if (confirmationid.length === 0) {
            showAlert('warning', "Wrong confirmation id.");
        } else {
            copyTextToClipboard(scriptCMD(copyText, cid));
        }
    }
}

function showAlert(messageAlert, messageText) {
    var alertBox = '<div class="alert alert-' + messageAlert + ' alert-dismissable" id="showalert" style="border-radius: 30px;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
    $('.messages').html(alertBox);
    $("#showalert").fadeTo(5000, 500).slideUp(500, function () {
        $("#showalert").slideUp(500);
    });
};

$(document).ready(function () {
    // Making 2 variable month and day
    var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

    // make single object
    var newDate = new Date();
    // make current time
    newDate.setDate(newDate.getDate());
    // setting date and time
    $('#Date').html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + '/' + monthNames[newDate.getMonth()] + '/' + newDate.getFullYear() + ", ");

    setInterval(function () {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    setInterval(function () {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);

    $("#InstallationID").click(function () {
        var iid = validateIID($("#InstallationID").val());
        var lengStr = iid.length;
        if ((lengStr === 54) || (lengStr === 63)) {
        } else {
            $('#InstallationID').val(" ");
        }
    });

    $('#InstallationID').change(function () {
        var str = validateIID($("#InstallationID").val());
        $('#InstallationID').val(str);
    });
    $("#GetConfirmationID").click(function () {
        $('#CID').val("Loadding...")
        $('#CID-').val("Loadding...")
        $("#InstallationID").attr('disabled', true);
        $("#GetConfirmationID").attr('disabled', true);
        $("#copyResult").attr('disabled', true);
        $("#copyResult-").attr('disabled', true);
        $("#optionVersion").attr('disabled', true);
        $("#copyCMD").attr('disabled', true);
        var iid = validateIID($("#InstallationID").val());
        var lengStr = iid.length;
        if ((lengStr === 54) || (lengStr === 63)) {
            clock()
            getcid(iid);//truyen value sesson về server
        } else {
            $('#CID').val("Wrong IID.");
            $('#CID-').val("Wrong IID.");
            $("#InstallationID").removeAttr('disabled');
            $("#GetConfirmationID").removeAttr('disabled');
            $("#copyResult").removeAttr('disabled');
            $("#copyResult-").removeAttr('disabled');
            $("#optionVersion").removeAttr('disabled');
            $("#copyCMD").removeAttr('disabled');
            showAlert('warning', "Wrong IID.");
        }
    });

    $('#copyResult').click(function () {
        var cid = $("#CID").val();
        if (cid.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cid);
            showAlert('success', "Copy success.");
        }
    });

    $('#copyResult-').click(function () {
        var cid1 = $("#CID-").val();
        if (cid1.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cid1);
            showAlert('success', "Copy success.");
        }
    });

    $("#copyCMD").click(function () {
        copycmd();
    });

    $('#optionVersion').change(function () {
        copycmd();
    });

    $("#registry").click(function () {
        $("#email").attr('disabled', true);
        $("#optionRegistry").attr('disabled', true);
        $("#registry").attr('disabled', true);
        $("#donate").attr('disabled', true);
        var email = $("#email").val();
        var optRegistry = $("#optionRegistry :selected").text();
        var registry;
        if (ValidateEmail(email) === false) {
            showAlert('warning', "You have entered an invalid email address!");
            alert("You have entered an invalid email address!");
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#registry").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
        } else {
            if (optRegistry === "Select registry") {
                showAlert('warning', "Please get select registry.");
                alert("Please get select registry.");
                $("#email").removeAttr('disabled');
                $("#optionRegistry").removeAttr('disabled');
                $("#registry").removeAttr('disabled');
                $("#donate").removeAttr('disabled');
            } else {
                registry = optRegistry.toLowerCase();
                var r = confirm("Do you want registry?");
                if (r == true) {
                    clock();
                    registryKey(email, registry);
                } else {
                    $("#email").removeAttr('disabled');
                    $("#optionRegistry").removeAttr('disabled');
                    $("#registry").removeAttr('disabled');
                    $("#donate").removeAttr('disabled');
                }
            }
        }
    });

    $("#getVerificationKey").click(function () {
        $.post("/verificationKey/check", {
            code: $("#verificationKey").val(), abc: $("#abc").val()
        })
            .done(function (ketqua) {
                var obj = JSON.parse(ketqua);
                $('#email').html(obj.email);
                $('#key').html(obj.codes);
                $('#typeKey').html(obj.typecodes);
                $('#totalUsage').html(obj.totalget);
                $('#totalUsed').html(obj.countget);
                showAlert('success', "Verification key successful.");
            })
            .fail(function () {
                showAlert('danger', "Unable to connect to the server, please try again later!");
            })
    });
});