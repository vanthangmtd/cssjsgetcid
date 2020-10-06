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

$(window).on("load",
    function () {
        $("#tbxIID").on("change paste input", function (e) {
            var t = this.value.replace(/\D/g, "");
            54 == t.length || 63 == t.length ? (this.value = t.match(new RegExp(".{1," + t.length / 9 + "}", "g")).join("-")) : (this.value = t)
        });
    });

function validateIID(iid) {
    return iid.replace(/\D/g, '').trim();
}

function validateTokenLink(tokenLink) {
    return tokenLink.replace(/[^a-z]/gi, "").trim();
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
    $.post("/getcid", { iid: iid, grecaptcha: grecaptcha.getResponse() })
        .done(function (ketqua) {
            var data = JSON.parse(ketqua);
            cid = data.cid;
            if (cid.length === 48) {
                $('#countget').html(data.count);
                $('#CID').val(cid);
                var CID1 = cid.substring(0, 6)
                var CID2 = cid.substring(6, 12)
                var CID3 = cid.substring(12, 18)
                var CID4 = cid.substring(18, 24)
                var CID5 = cid.substring(24, 30)
                var CID6 = cid.substring(30, 36)
                var CID7 = cid.substring(36, 42)
                var CID8 = cid.substring(42, 48)
                $("#blockA").val(CID1);
                $("#blockB").val(CID2);
                $("#blockC").val(CID3);
                $("#blockD").val(CID4);
                $("#blockE").val(CID5);
                $("#blockF").val(CID6);
                $("#blockG").val(CID7);
                $("#blockH").val(CID8);
                $("#lenhCMD").val("");
                showAlert('success', "Get confirmation id success.");
            } else if (ketqua === "Server too busy.") {
                $('#CID').val(cid);
                cleandata();
                showAlert('danger', cid);
            } else {
                $('#CID').val(cid);
                cleandata();
                showAlert('success', "Get confirmation id success.");
            }
            $("#btnGETCID").html('GET');
            $("#tbxIID").removeAttr('disabled');
            $("#btnGETCID").removeAttr('disabled');
            $("#copyResult").removeAttr('disabled');
            $("#copyResult-").removeAttr('disabled');
            $("#optionVersion").removeAttr('disabled');
            $("#copyCMD").removeAttr('disabled');
            clearInterval(interval);
            grecaptcha.reset();
        })
        .fail(function () {
            cleandata();
            $("#btnGETCID").html('GET');
            showAlert('danger', "Unable to connect to the server, please try again later!");
            $('#CID').val("Cannot get confirmation id.");
            $("#tbxIID").removeAttr('disabled');
            $("#btnGETCID").removeAttr('disabled');
            $("#copyResult").removeAttr('disabled');
            $("#copyResult-").removeAttr('disabled');
            $("#optionVersion").removeAttr('disabled');
            $("#copyCMD").removeAttr('disabled');
            clearInterval(interval);
            grecaptcha.reset();
        });
}

function copycid(cid) {
    if (cid === "A") {
        var cidblock = $("#blockA").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "B") {
        var cidblock = $("#blockB").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "C") {
        var cidblock = $("#blockC").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "D") {
        var cidblock = $("#blockD").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "E") {
        var cidblock = $("#blockE").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "F") {
        var cidblock = $("#blockF").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "G") {
        var cidblock = $("#blockG").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "H") {
        var cidblock = $("#blockH").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    } else if (cid === "All") {
        var cidblock = $("#CID").val();
        if (cidblock.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            copyTextToClipboard(cidblock);
        }
    }

}

function scriptCMD(optionVersion, cid) {
    if (optionVersion === "All Windows") {
        var cmdWindows = "set CID=" + cid + "\ncscript slmgr.vbs /atp %CID%\ncscript slmgr.vbs /ato\n"
        cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n"
        cmdWindows = cmdWindows + "echo DATE: %date% >status.txt\n"
        cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt\n"
        cmdWindows = cmdWindows + "for /f \"tokens=3\" %b in ('cscript.exe %windir%\\system32\\slmgr.vbs /dti') do set IID=%b\n"
        cmdWindows = cmdWindows + "echo IID: %IID% >>status.txt\n"
        cmdWindows = cmdWindows + "echo CID: " + cid + " >>status.txt\n"
        cmdWindows = cmdWindows + "cscript slmgr.vbs /dli >>status.txt\n"
        cmdWindows = cmdWindows + "cscript slmgr.vbs /xpr >>status.txt\n"
        cmdWindows = cmdWindows + "start status.txt\n";
        return cmdWindows;
    } else if (optionVersion === "All Office") {
        var cmdAllOffice = "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")\n"
        cmdAllOffice = cmdAllOffice + "if exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))\n"
        cmdAllOffice = cmdAllOffice + "set CID=" + cid + "\n"
        cmdAllOffice = cmdAllOffice + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        cmdAllOffice = cmdAllOffice + "cscript.exe OSPP.vbs /act\n"
        cmdAllOffice = cmdAllOffice + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n"
        cmdAllOffice = cmdAllOffice + "echo DATE: %date% >status.txt\n"
        cmdAllOffice = cmdAllOffice + "echo TIME: %time% >>status.txt\n"
        cmdAllOffice = cmdAllOffice + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n"
        cmdAllOffice = cmdAllOffice + "echo IID: %IID%>>status.txt\n"
        cmdAllOffice = cmdAllOffice + "echo CID: " + cid + ">>status.txt\n"
        cmdAllOffice = cmdAllOffice + "cscript ospp.vbs /dstatus >>status.txt\n"
        cmdAllOffice = cmdAllOffice + "start status.txt\n";
        return cmdAllOffice;
    } else if (optionVersion === "Office 2010") {
        var Office2010 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office14\")\n"
        Office2010 = Office2010 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\")\n"
        Office2010 = Office2010 + "set CID=" + cid + "\n"
        Office2010 = Office2010 + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        Office2010 = Office2010 + "cscript.exe OSPP.vbs /act\n"
        Office2010 = Office2010 + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n"
        Office2010 = Office2010 + "echo DATE: %date% >status.txt\n"
        Office2010 = Office2010 + "echo TIME: %time% >>status.txt\n"
        Office2010 = Office2010 + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n"
        Office2010 = Office2010 + "echo IID: %IID%>>status.txt\n"
        Office2010 = Office2010 + "echo CID:" + cid + ">>status.txt\n"
        Office2010 = Office2010 + "cscript ospp.vbs /dstatus >>status.txt\n"
        Office2010 = Office2010 + "start status.txt\n";
        return Office2010
    } else if (optionVersion === "Office 2013") {
        var Office2013 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office15\")\n"
        Office2013 = Office2013 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\")\n"
        Office2013 = Office2013 + "set CID=" + cid + "\n"
        Office2013 = Office2013 + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        Office2013 = Office2013 + "cscript.exe OSPP.vbs /act\n"
        Office2013 = Office2013 + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n"
        Office2013 = Office2013 + "echo DATE: %date% >status.txt\n"
        Office2013 = Office2013 + "echo TIME: %time% >>status.txt\n"
        Office2013 = Office2013 + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n"
        Office2013 = Office2013 + "echo IID: %IID%>>status.txt\n"
        Office2013 = Office2013 + "echo CID: " + cid + ">>status.txt\n"
        Office2013 = Office2013 + "cscript ospp.vbs /dstatus >>status.txt\n"
        Office2013 = Office2013 + "start status.txt\n";
        return Office2013
    } else if (optionVersion === "Office 2016/2019") {
        var Office2016 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\")\n"
        Office2016 = Office2016 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\")\n"
        Office2016 = Office2016 + "set CID=" + cid + "\n"
        Office2016 = Office2016 + "cscript //nologo OSPP.VBS /actcid:%CID%\n"
        Office2016 = Office2016 + "cscript.exe OSPP.vbs /act\n"
        Office2016 = Office2016 + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n"
        Office2016 = Office2016 + "echo DATE: %date% >status.txt\n"
        Office2016 = Office2016 + "echo TIME: %time% >>status.txt\n"
        Office2016 = Office2016 + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n"
        Office2016 = Office2016 + "echo IID: %IID%>>status.txt\n"
        Office2016 = Office2016 + "echo CID: " + cid + ">>status.txt\n"
        Office2016 = Office2016 + "cscript ospp.vbs /dstatus >>status.txt\n"
        Office2016 = Office2016 + "start status.txt\n";
        return Office2016
    } else {
        return ""
    }
}

function copycmd() {
    var cid = $("#CID").val();
    var copyText = $("#optionVersion :selected").val();
    if ((cid.length === 0) || (copyText === "Select version")) {
        showAlert('warning', "Please get confirmation id and select version.");
    } else {
        var confirmationid = validateIID(cid);
        if (confirmationid.length === 0) {
            showAlert('warning', "Wrong confirmation id.");
        } else {
            copyTextToClipboard(scriptCMD(copyText, cid));
            $("#lenhCMD").val(scriptCMD(copyText, cid));
        }
    }
}

function showAlert(messageAlert, messageText) {
    var alertBox = '<div class="alert alert-' + messageAlert + ' alert-dismissable" id="showalert"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="word-break">' + messageText + '</span></div>';
    $('.messages').html(alertBox);
    $("#showalert").fadeTo(5000, 500).slideUp(500, function () {
        $("#showalert").slideUp(500);
    });
};

function register_api_token(email, token_type) {
    $.post("/register-api-token", {
        email: email,
        token_type: token_type,
        grecaptcha: grecaptcha.getResponse()
    })
        .done(function (ketqua) {
            $("#register_api_token").html('Submit');
            showAlert('success', "Registry successful.");
            alert(ketqua);
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#register_api_token").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
            clearInterval(interval);
            grecaptcha.reset();
        })
        .fail(function () {
            $("#register_api_token").html('Submit');
            showAlert('danger', "Unable to connect to the server, please try again later!");
            alert("Unable to connect to the server, please try again later!");
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#register_api_token").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
            clearInterval(interval);
            grecaptcha.reset();
        })
}

function copylink() {
    var link = $("#linkquick").val();
    if (link.length === 0) {
        showAlert('warning', "Please quick link.");
    } else {
        copyTextToClipboard(link);
    }
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

function cleandata() {
    $("#blockA").val("");
    $("#blockB").val("");
    $("#blockC").val("");
    $("#blockD").val("");
    $("#blockE").val("");
    $("#blockF").val("");
    $("#blockG").val("");
    $("#blockH").val("");
    $("#lenhCMD").val("");
    $("#linkquick").val("");
}

function tokenlink(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function short_Links(link, tokenLink) {
    $.post("/short-links", { link: link, tokenLink: tokenLink, grecaptcha: grecaptcha.getResponse() })
        .done(function (ketqua) {
            $("#linkquick").val(ketqua);
            $("#linkcustom").val(tokenlink(5));
            $("#link").val("");
            $("#link").removeAttr('disabled');
            $("#linkcustom").removeAttr('disabled');
            $("#Getquicklink").removeAttr('disabled');
            $("#linkquick").removeAttr('disabled');
            $("#copylinkquick").removeAttr('disabled');
            showAlert('success', "Quick link success.");
            clearInterval(interval);
            grecaptcha.reset();
        })
        .fail(function () {
            $("#link").removeAttr('disabled');
            $("#linkcustom").removeAttr('disabled');
            $("#Getquicklink").removeAttr('disabled');
            $("#linkquick").removeAttr('disabled');
            $("#copylinkquick").removeAttr('disabled');
            cleandata();
            showAlert('danger', "Sorry, cannot get quick links.");
            clearInterval(interval);
            grecaptcha.reset();
        })
}

function pidkey(key, version) {
    $.post("/check-pidkey", { key: key, version: version })
        .done(function (ketqua) {
            $("#result_key").val(ketqua);
            $("#btnPIDKEY").html('GET');
            $("#key").removeAttr('disabled');
            $("#optionPIDKEY").removeAttr('disabled');
            $("#btnPIDKEY").removeAttr('disabled');
            showAlert('success', "Check key success.");
            clearInterval(interval);
        })
        .fail(function () {
            $("#btnPIDKEY").html('GET');
            $("#key").removeAttr('disabled');
            $("#optionPIDKEY").removeAttr('disabled');
            $("#btnPIDKEY").removeAttr('disabled');
            showAlert('danger', "Sorry, cannot connect server.");
            clearInterval(interval);
        })
}

$(document).ready(function () {
    $(".domain").html(window.location.protocol + '//' + window.location.hostname);
    $("#history_view").hide();
    $("#view_history_api_token").hide();
    $("#copyMaHoa").hide();
    $("#copyGiaiMa").hide();
    $("#dvCSV").hide();
    $("#dvCSV").html('');
    $("#downloadAreateAcc").hide();
    $("#history_api_token").attr('disabled', true);
    $("#copyMaHoa").attr('disabled', true);
    $("#copyGiaiMa").attr('disabled', true);

    $("#tbxIID").click(function () {
        var iid = validateIID($("#tbxIID").val());
        var lengStr = iid.length;
        if ((lengStr === 54) || (lengStr === 63)) {
        } else {
            $('#tbxIID').val("");
        }
    });

    $("#btnGETCID").click(function () {
        var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
        $("#btnGETCID").html(button);
        cleandata();
        $('#CID').val("Loadding...")
        $('#CID-').val("Loadding...")
        $("#tbxIID").attr('disabled', true);
        $("#btnGETCID").attr('disabled', true);
        $("#copyResult").attr('disabled', true);
        $("#copyResult-").attr('disabled', true);
        $("#optionVersion").attr('disabled', true);
        $("#copyCMD").attr('disabled', true);
        var iid = validateIID($("#tbxIID").val());
        var lengStr = iid.length;
        if ((lengStr === 54) || (lengStr === 63) && grecaptcha.getResponse().length != 0) {
            clock()
            getcid(iid);
        } else if (grecaptcha.getResponse().length === 0) {
            $("#btnGETCID").html('GET');
            $('#CID').val("Sorry, cannot get confirmation id.");
            $("#tbxIID").removeAttr('disabled');
            $("#btnGETCID").removeAttr('disabled');
            $("#copyResult").removeAttr('disabled');
            $("#copyResult-").removeAttr('disabled');
            $("#optionVersion").removeAttr('disabled');
            $("#copyCMD").removeAttr('disabled');
            showAlert('warning', "Sorry, cannot get confirmation id.");
        } else {
            $("#btnGETCID").html('GET');
            $('#CID').val("Wrong IID.");
            $("#tbxIID").removeAttr('disabled');
            $("#btnGETCID").removeAttr('disabled');
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
        var cidA = $("#blockA").val();
        var cidB = $("#blockB").val();
        var cidC = $("#blockC").val();
        var cidD = $("#blockD").val();
        var cidE = $("#blockE").val();
        var cidF = $("#blockF").val();
        var cidG = $("#blockG").val();
        var cidH = $("#blockH").val();
        if (cidA.length === 0 || cidB.length === 0 || cidC.length === 0 || cidD.length === 0 || cidE.length === 0 || cidF.length === 0 || cidG.length === 0 || cidH.length === 0) {
            showAlert('warning', "Please get confirmation id.");
        } else {
            var cid = cidA + '-' + cidB + '-' + cidC + '-' + cidD + '-' + cidE + '-' + cidF + '-' + cidG + '-' + cidH;
            copyTextToClipboard(cid);
            showAlert('success', "Copy success.");
        }
    });

    $("#copyCMD").click(function () {
        copycmd();
    });

    $('#optionVersion').change(function () {
        copycmd();
    });

    $("#register_api_token").click(function () {
        var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
        $("#register_api_token").html(button);
        $("#email").attr('disabled', true);
        $("#optionRegistry").attr('disabled', true);
        $("#register_api_token").attr('disabled', true);
        $("#donate").attr('disabled', true);
        var email = $("#email").val();
        var optRegistry = $("#optionRegistry :selected").val();
        var registry;
        if (ValidateEmail(email) === false) {
            $("#register_api_token").html('Submit');
            showAlert('warning', "You have entered an invalid email address!");
            alert("You have entered an invalid email address!");
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#register_api_token").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
        } else if (grecaptcha.getResponse().length === 0) {
            $("#register_api_token").html('Submit');
            showAlert('warning', "Sorry, we could not generate api token.");
            alert("Sorry, we could not generate api token.");
            $("#email").removeAttr('disabled');
            $("#optionRegistry").removeAttr('disabled');
            $("#register_api_token").removeAttr('disabled');
            $("#donate").removeAttr('disabled');
        }
        else {
            if (optRegistry === "Select registry") {
                $("#register_api_token").html('Submit');
                showAlert('warning', "Please get select registry.");
                alert("Please get select registry.");
                $("#email").removeAttr('disabled');
                $("#optionRegistry").removeAttr('disabled');
                $("#register_api_token").removeAttr('disabled');
                $("#donate").removeAttr('disabled');
            } else {
                registry = optRegistry.toLowerCase();
                var r = confirm("Do you want registry?");
                if (r == true) {
                    clock();
                    register_api_token(email, registry);
                } else {
                    $("#register_api_token").html('Submit');
                    $("#email").removeAttr('disabled');
                    $("#optionRegistry").removeAttr('disabled');
                    $("#register_api_token").removeAttr('disabled');
                    $("#donate").removeAttr('disabled');
                }
            }
        }
    });

    $("#verify_api_token").click(function () {
        $.post("/verify-apitoken", {
            token: $("#apitoken").val()
        })
            .done(function (ketqua) {
                var obj = JSON.parse(ketqua);
                $('#email').val(obj.email);
                $('#apitoken_result').val(obj.token);
                $('#token_type').val(obj.tokentype);
                $('#totalUsage').val(obj.totalget);
                $('#totalUsed').val(obj.countget);
                if (obj.email === "") {
                    $("#history_api_token").attr('disabled', true);
                    $("#history_view").hide();
                } else {
                    $("#history_view").show();
                    $("#history_api_token").removeAttr('disabled');
                }
                showAlert('success', "Verification key successful.");
            })
            .fail(function () {
                showAlert('danger', "Unable to connect to the server, please try again later!");
            });
        var table = $('#datatable').DataTable();
        table.clear().draw();
        $("#view_history_api_token").hide();
    });

    $("#history_api_token").click(function () {
        $.post("/history-api-token", {
            token: $("#apitoken_result").val()
        }).done(function (ketqua) {
            console.log(ketqua);
            $('#datatable').DataTable({
                destroy: true,
                data: ketqua,
                columns: [
                    { 'data': 'id' },
                    { 'data': 'token' },
                    { 'data': 'ip' },
                    { 'data': 'countryn' },
                    { 'data': 'time' }
                ]
            });
        }).fail(function () {
            showAlert('danger', "Unable to connect to the server, please try again later!");
        });
        $("#view_history_api_token").show();
    });

    $("#linkcustom").val(tokenlink(5));

    $("#linkcustom").on('keyup', function () {
        var t = this.value.replace(/[^a-z]/gi, "").trim();
        this.value = t;
    });

    $("#Getquicklink").click(function () {
        cleandata();
        $("#link").attr('disabled', true);
        $("#linkcustom").attr('disabled', true);
        $("#Getquicklink").attr('disabled', true);
        $("#linkquick").attr('disabled', true);
        $("#copylinkquick").attr('disabled', true);
        var link = $("#link").val();
        var tokenLink = validateTokenLink($("#linkcustom").val());
        if (link.length != 0) {
            if (tokenLink.length != 0) {
                $.post("/verify-token-link-exist", { tokenLink: tokenLink })
                    .done(function (ketqua) {
                        var checklinkcustom = ketqua;
                        if (checklinkcustom === "true") {
                            $("#link").removeAttr('disabled');
                            $("#linkcustom").removeAttr('disabled');
                            $("#Getquicklink").removeAttr('disabled');
                            $("#linkquick").removeAttr('disabled');
                            $("#copylinkquick").removeAttr('disabled');
                            showAlert('warning', "Sorry, quick link already exists.");
                        } else if (checklinkcustom === "false") {
                            var r = confirm("Your quick link is: https://getcid.info/tolink/" + tokenLink + "\nDo you want quick link ? ");
                            if (r == true) {
                                if (grecaptcha.getResponse().length === 0) {
                                    $("#link").removeAttr('disabled');
                                    $("#linkcustom").removeAttr('disabled');
                                    $("#Getquicklink").removeAttr('disabled');
                                    $("#linkquick").removeAttr('disabled');
                                    $("#copylinkquick").removeAttr('disabled');
                                    showAlert('warning', "Sorry, cannot get quick links.");
                                } else if (link.length != 0 && grecaptcha.getResponse().length != 0) {
                                    clock()
                                    short_Links(link, tokenLink);
                                } else {
                                    $("#link").removeAttr('disabled');
                                    $("#linkcustom").removeAttr('disabled');
                                    $("#Getquicklink").removeAttr('disabled');
                                    $("#linkquick").removeAttr('disabled');
                                    $("#copylinkquick").removeAttr('disabled');
                                    showAlert('warning', "Sorry, cannot get quick links.");
                                }
                            } else {
                                $("#link").removeAttr('disabled');
                                $("#linkcustom").removeAttr('disabled');
                                $("#Getquicklink").removeAttr('disabled');
                                $("#linkquick").removeAttr('disabled');
                                $("#copylinkquick").removeAttr('disabled');
                            }
                        } else {
                            $("#link").removeAttr('disabled');
                            $("#linkcustom").removeAttr('disabled');
                            $("#Getquicklink").removeAttr('disabled');
                            $("#linkquick").removeAttr('disabled');
                            $("#copylinkquick").removeAttr('disabled');
                            showAlert('warning', checklinkcustom);
                        }
                    })
                    .fail(function () {
                        $("#link").removeAttr('disabled');
                        $("#linkcustom").removeAttr('disabled');
                        $("#Getquicklink").removeAttr('disabled');
                        $("#linkquick").removeAttr('disabled');
                        $("#copylinkquick").removeAttr('disabled');
                        showAlert('danger', "Unable to connect to the server, please try again later!");
                    })
            } else {
                clock()
                short_Links(link, tokenLink);
            }
        } else {
            $("#link").removeAttr('disabled');
            $("#linkcustom").removeAttr('disabled');
            $("#Getquicklink").removeAttr('disabled');
            $("#linkquick").removeAttr('disabled');
            $("#copylinkquick").removeAttr('disabled');
            showAlert('warning', "Sorry, the link cannot be empty.");
        }
    });

    $("#copylinkquick").click(function () { copylink() });

    $("#maHoa").click(function () {
        $("#codesMaHoa").val("");
        var keymahoa = $("#keymahoa").val();
        var lengStr = keymahoa.length;
        if (lengStr === 0) {
            showAlert('warning', "Key must not be empty.");
        } else {
            $.post("/encrypt", {
                data: keymahoa,
                grecaptcha: grecaptcha.getResponse()
            })
                .done(function (ketqua) {
                    $("#codesMaHoa").val(ketqua);
                    showAlert('success', "Encryption successful.");
                    $("#copyMaHoa").show();
                    $("#copyMaHoa").removeAttr('disabled');
                    grecaptcha.reset();
                })
                .fail(function () {
                    showAlert('danger', "Unable to connect to the server, please try again later!");
                    grecaptcha.reset();
                })
        }
    });

    $("#giaiMa").click(function () {
        $("#keygiaima").val("");
        var codesGiaiMa = $("#codesGiaiMa").val();
        var lengStr = codesGiaiMa.length;
        if (lengStr === 0) {
            showAlert('warning', "Encryption key must not be empty.");
        } else {
            $.post("/decrypt", {
                codes: codesGiaiMa
            })
                .done(function (ketqua) {
                    $("#keygiaima").val(ketqua);
                    showAlert('success', "Decryption successful.");
                    var lengthKetqua = ketqua.length;
                    console.log(lengthKetqua);
                    if (lengthKetqua != 0) {
                        $("#copyGiaiMa").show();
                        $("#copyGiaiMa").removeAttr('disabled');
                    } else {
                        $("#copyGiaiMa").hide();
                        $("#copyGiaiMa").attr('disabled', true);
                    }
                })
                .fail(function () {
                    showAlert('danger', "Unable to connect to the server, please try again later!");
                    $("#codesGiaiMa").val("");
                })
        }
    });

    $('#copyCodesMaHoa').click(function () {
        var codesMaHoa = $("#codesMaHoa").val();
        if (codesMaHoa.length === 0) {
            showAlert('warning', "Please get Encryption.");
        } else {
            copyTextToClipboard(codesMaHoa);
            showAlert('success', "Copy success.");
        }
    });

    $('#copyKeyGiaiMa').click(function () {
        var keygiaima = $("#keygiaima").val();
        if (keygiaima.length === 0) {
            showAlert('warning', "Please get Decryption.");
        } else {
            copyTextToClipboard(keygiaima);
            showAlert('success', "Copy success.");
        }
    });

    $('#btnPIDKEY').click(function () {
        $("#result_key").val('');
        var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
        $("#btnPIDKEY").html(button);
        $("#key").attr('disabled', true);
        $("#optionPIDKEY").attr('disabled', true);
        $("#btnPIDKEY").attr('disabled', true);
        var key = $("#key").val();
        var optionPIDKEY = $("#optionPIDKEY :selected").val();
        if (key.length === 0) {
            alert("Sorry, Key cannot be empty.");
            $("#btnPIDKEY").html('GET');
            $("#key").removeAttr('disabled');
            $("#optionPIDKEY").removeAttr('disabled');
            $("#btnPIDKEY").removeAttr('disabled');
        } else if (optionPIDKEY === "") {
            alert("Sorry, version key is not correct.");
            $("#btnPIDKEY").html('GET');
            $("#key").removeAttr('disabled');
            $("#optionPIDKEY").removeAttr('disabled');
            $("#btnPIDKEY").removeAttr('disabled');
        }
        else {
            clock();
            pidkey(key, optionPIDKEY);
        }
    });
})
