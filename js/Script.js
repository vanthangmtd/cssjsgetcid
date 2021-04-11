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

function validatePhone(txtPhone) {
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(txtPhone)) {
        return true;
    }
    else {
        return false;
    }
}

function getcid(iid) {
    $.post({
        url: "/getcid",
        data: { 'iid': iid },
        headers: {
            'grecaptcha': grecaptcha.getResponse(),
            'authenToken': content
        }
    })
        .done(function (ketqua, status, xhr) {
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
                $('#CID').val("Sorry, the website is currently maintaining getcid, please visit it later.");
                cleandata();
                showAlert('danger', cid);
            }else if(ketqua === "Blocked IID."){
                $('#CID').val("Key block.");
                cleandata();
                showAlert('success', "Get confirmation id success.");
            }
             else {
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
            content = xhr.getResponseHeader("authenToken");
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

function register_api_token(email, countApi) {
    $.post("/register-api-token", {
        email: email,
        countApi: countApi,
        grecaptcha: grecaptcha.getResponse()
    })
        .done(function (ketqua) {
            $("#register_api_token").html('Submit');
            showAlert('success', "Registry successful.");
            alert(ketqua);
            $("#email").removeAttr('disabled');
            $("#countapi").removeAttr('disabled');
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
            $("#countapi").removeAttr('disabled');
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

function pidkey(key, version, token) {
    $.post("/check-pidkey", { key: key, version: version, token: token, grecaptcha: grecaptcha.getResponse() })
        .done(function (ketqua) {
            $("#result_key").val(ketqua);
            $("#btnPIDKEY").html('GET');
            $("#key").removeAttr('disabled');
            $("#optionPIDKEY").removeAttr('disabled');
            $("#btnPIDKEY").removeAttr('disabled');
            showAlert('success', "Check key success.");
            grecaptcha.reset();
            clearInterval(interval);
        })
        .fail(function () {
            $("#btnPIDKEY").html('GET');
            $("#key").removeAttr('disabled');
            $("#optionPIDKEY").removeAttr('disabled');
            $("#btnPIDKEY").removeAttr('disabled');
            showAlert('danger', "Sorry, cannot connect server.");
            grecaptcha.reset();
            clearInterval(interval);
        })
}

(function () {
    /**
     * Tinh chỉ số thập phân của một con số.
     *
     * @param {String}  type  Loại điều chỉnh.
     * @param {Number}  value Số liệu.
     * @param {Integer} exp   Số mũ (the 10 logarithm of the adjustment base).
     * @returns {Number} Giá trị đã chỉnh sửa.
     */
    function decimalAdjust(type, value, exp) {
        // Nếu exp có giá trị undefined hoặc bằng không thì...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Nếu value không phải là ố hoặc exp không phải là số nguyên thì...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Làm tròn số thập phân (ra xa giá trị 0)
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

function createAcc(dataCreateAcc, token) {
    $.post("/acc365/createAcc", {
        infoUser: dataCreateAcc,
        token: token
    })
        .done(function (ketqua) {
            $('#datatable').DataTable({
                destroy: true,
                data: ketqua,
                columns: [
                    { 'data': 'id' },
                    { 'data': 'email' },
                    { 'data': 'password' },
                    { 'data': 'results' }
                ]
            });
            clearInterval(interval);
            $("#createAcc365").removeAttr('disabled');
            showAlert('success', "Create account office 365 successful.");
            $("#downloadAreateAcc").show();
            cleanandenableItemInfoAcc()
            $("#createAcc365").html('Submit');
        })
        .fail(function () {
            $("#createAcc365").removeAttr('disabled');
            clearInterval(interval);
            showAlert('danger', "Unable to connect to the server, please try again later!");
            cleanandenableItemInfoAcc()
            $("#createAcc365").html('Submit');
        })
}

function disableItemInfoAcc() {
    $("#fName").attr('disabled', true);
    $("#lName").attr('disabled', true);
    $("#userName").attr('disabled', true);
    $("#mail").attr('disabled', true);
}

function enableItemInfoAcc() {
    $("#fName").removeAttr('disabled');
    $("#lName").removeAttr('disabled');
    $("#userName").removeAttr('disabled');
    $("#mail").removeAttr('disabled');
    $("#dvCSV").html('');
}

function cleanandenableItemInfoAcc() {
    $("#file").val('');
    $("#fName").val('');
    $("#lName").val('');
    $("#userName").val('');
    $("#mail").val('');
    $("#file").removeAttr('disabled');
    enableItemInfoAcc();
}

function disableItemRegistry365() {
    $("#email").attr('disabled', true);
    $("#tenant_id").attr('disabled', true);
    $("#client_ID").attr('disabled', true);
    $("#client_secrets").attr('disabled', true);
    $("#domain_name").attr('disabled', true);
    $("#optionRegistry").attr('disabled', true);
    $("#registry365").attr('disabled', true);
}

function enableItemRegistry365() {
    $("#email").removeAttr('disabled');
    $("#tenant_id").removeAttr('disabled');
    $("#client_ID").removeAttr('disabled');
    $("#client_secrets").removeAttr('disabled');
    $("#domain_name").removeAttr('disabled');
    $("#optionRegistry").removeAttr('disabled');
    $("#registry365").removeAttr('disabled');
}

var recaptchaCallback = function () {
    $.post({
        url: "/recaptcha",
        headers: {
            'grecaptcha': grecaptcha.getResponse(),
            'content': content
        }
    });
};

$(document).ready(function () {
    $(".domain").html(window.location.protocol + '//' + window.location.hostname);
    $("#history_view").hide();
    $("#view_history_api_token").hide();
    $("#copyMaHoa").hide();
    $("#copyGiaiMa").hide();
    $("#dvCSV").hide();
    $("#synPidkeyResult").hide();
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
        var iid = validateIID($("#tbxIID").val());
        var lengStr = iid.length;
        if ((lengStr === 54) || (lengStr === 63) && grecaptcha.getResponse().length != 0) {
            var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
            $("#btnGETCID").html(button);
            cleandata();
            $('#CID').val("Loadding...")
            $("#tbxIID").attr('disabled', true);
            $("#btnGETCID").attr('disabled', true);
            $("#copyResult").attr('disabled', true);
            $("#copyResult-").attr('disabled', true);
            $("#optionVersion").attr('disabled', true);
            $("#copyCMD").attr('disabled', true);
            clock()
            getcid(iid);
        } else if (grecaptcha.getResponse().length === 0) {
            showAlert('warning', "Sorry, cannot get confirmation id.");
        } else {
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
        var email = $("#email").val();
        var countapi = $("#countapi").val();
        if (ValidateEmail(email) === false) {
            showAlert('warning', "You have entered an invalid email address!");
            alert("You have entered an invalid email address!");
        } else if (grecaptcha.getResponse().length === 0) {
            showAlert('warning', "Sorry, we could not generate api token.");
            alert("Sorry, we could not generate api token.");
        } else if (countapi < 1) {
            showAlert('warning', "Please enter the number of api times greater than 0.");
            alert("Please enter the number of api times greater than 0.");
        }
        else {
            var r = confirm("Do you want registry?");
            if (r == true) {
                var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
                $("#register_api_token").html(button);
                $("#email").attr('disabled', true);
                $("#countapi").attr('disabled', true);
                $("#register_api_token").attr('disabled', true);
                $("#donate").attr('disabled', true);
                clock();
                register_api_token(email, countapi);
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
        var link = $("#link").val();
        var tokenLink = validateTokenLink($("#linkcustom").val());
        if (link.length != 0) {
            if (tokenLink.length != 0) {
                $.post("/verify-token-link-exist", { tokenLink: tokenLink })
                    .done(function (ketqua) {
                        var checklinkcustom = ketqua;
                        if (checklinkcustom === "true") {
                            showAlert('warning', "Sorry, quick link already exists.");
                        } else if (checklinkcustom === "false") {
                            var r = confirm("Your quick link is: https://getcid.info/tolink/" + tokenLink + "\nDo you want quick link ? ");
                            if (r == true) {
                                if (grecaptcha.getResponse().length === 0) {
                                    showAlert('warning', "Sorry, cannot get quick links.");
                                } else if (link.length != 0 && grecaptcha.getResponse().length != 0) {
                                    $("#link").attr('disabled', true);
                                    $("#linkcustom").attr('disabled', true);
                                    $("#Getquicklink").attr('disabled', true);
                                    $("#linkquick").attr('disabled', true);
                                    $("#copylinkquick").attr('disabled', true);
                                    clock()
                                    short_Links(link, tokenLink);
                                } else {
                                    showAlert('warning', "Sorry, cannot get quick links.");
                                }
                            }
                        } else {
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
                data: keymahoa
            })
                .done(function (ketqua) {
                    $("#codesMaHoa").val(ketqua);
                    showAlert('success', "Encryption successful.");
                    $("#copyMaHoa").show();
                    $("#copyMaHoa").removeAttr('disabled');
                })
                .fail(function () {
                    showAlert('danger', "Unable to connect to the server, please try again later!");
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
                codes: codesGiaiMa,
                grecaptcha: grecaptcha.getResponse()
            })
                .done(function (ketqua) {
                    $("#keygiaima").val(ketqua);
                    showAlert('success', "Decryption successful.");
                    var lengthKetqua = ketqua.length;
                    if (lengthKetqua != 0) {
                        $("#copyGiaiMa").show();
                        $("#copyGiaiMa").removeAttr('disabled');
                    } else {
                        $("#copyGiaiMa").hide();
                        $("#copyGiaiMa").attr('disabled', true);
                    }
                    grecaptcha.reset();
                })
                .fail(function () {
                    showAlert('danger', "Unable to connect to the server, please try again later!");
                    $("#codesGiaiMa").val("");
                    grecaptcha.reset();
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
        var token = $("#tokenSyn").val();
        var key = $("#key").val();
        var optionPIDKEY = $("#optionPIDKEY :selected").val();
        if (key.length === 0) {
            alert("Sorry, Key cannot be empty.");
        } else if (optionPIDKEY === "") {
            alert("Sorry, version key is not correct.");
        }
        else if (grecaptcha.getResponse().length === 0) {
            showAlert('warning', "Sorry, you must authenticate Recaptcha.");
            alert("Sorry, you must authenticate Recaptcha.");
        }
        else {
            var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
            $("#btnPIDKEY").html(button);
            $("#key").attr('disabled', true);
            $("#optionPIDKEY").attr('disabled', true);
            $("#btnPIDKEY").attr('disabled', true);
            clock();
            pidkey(key, optionPIDKEY, token);
        }
    });

    $("#countapi").keyup(function () {
        var count = $("#countapi").val();
        if (count <= 5) {
            $("#vnd").val("0 VND");
            $("#usd").val("$0");
        } else {
            $("#vnd").val(count * 250 + "VND");
            var tiendobandau = (count * 250) / 22000;
            var phipaypal = tiendobandau * 0.4 / 100;
            var thanhtien = Math.ceil10(tiendobandau + phipaypal + 3.03, -2);
            $("#usd").val("$" + (thanhtien));
        }
    });
    $("#countapi").change(function () {
        var count = $("#countapi").val();
        if (count <= 5) {
            $("#vnd").val("0 VND");
            $("#usd").val("$0");
        } else {
            $("#vnd").val(count * 250 + "VND");
            var tiendobandau = (count * 250) / 22000;
            var phipaypal = tiendobandau * 0.4 / 100;
            var thanhtien = Math.ceil10(tiendobandau + phipaypal + 3.03, -2);
            $("#usd").val("$" + (thanhtien));
        }
    });

    $('#createAcc365').click(function () {
        var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
        $("#createAcc365").html(button);
        var fname = $("#fName").val();
        var lname = $("#lName").val();
        var username = $("#userName").val();
        var mail = $("#mail").val();
        var dataCSV = $("#dvCSV").html();
        var data = '';
        var dataCreateAcc = '';
        var token = $("#codes").val();
        if (token === '') {
            alert("Please verify before creating an account.");
            $("#createAcc365").removeAttr('disabled');
            $("#createAcc365").html('Submit');
        } else {
            if (dataCSV === '') {
                if (fName === '') {
                    data = ''
                    alert("Please provide First Name, Last Name.");
                    $("#createAcc365").html('Submit');
                } else if (lname === '') {
                    data = ''
                    alert("Please provide First Name, Last Name.");
                    $("#createAcc365").html('Submit');
                } else if (username === '') {
                    data = ''
                    alert("Please provide a Username.");
                    $("#createAcc365").html('Submit');
                } else if (mail === '') {
                    data = ''
                    alert("Please provide a Email.");
                    $("#createAcc365").html('Submit');
                } else {
                    var item = new Object();
                    item.fname = fname;
                    item.lname = lname;
                    item.username = username;
                    item.email = mail;
                    data = "[" + JSON.stringify(item) + "]";
                }
            } else {
                dataCreateAcc = dataCSV;
            }
            if (data != '') {
                dataCreateAcc = data;
            } else {
                dataCreateAcc = dataCSV;
            }
            if (dataCreateAcc === '') {
                alert("Please provide account creation information.");
                $("#createAcc365").html('Submit');
            } else {
                $("#createAcc365").attr('disabled', true);
                $("#dvCSV").html('');
                clock();
                createAcc(dataCreateAcc, token)
            }
        }
    });

    $("#downloadAreateAcc365").click(function () {
        var data = '';
        $.each($('#datatable').DataTable().rows().data().toArray(), function () {
            $.each(this, function (name, value) {
                data = data + name + ': ' + value + ', '
            });
            data = data + '\n';
        });
        var blob = new Blob([data], { type: "application/json;utf-8" });
        var userLink = document.createElement('a');
        userLink.setAttribute('download', 'List data acc.txt');
        userLink.setAttribute('href', window.URL.createObjectURL(blob));
        userLink.click();
    });

    $("#file").change(function () {
        disableItemInfoAcc();
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#file").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var datajson = new Array();
                    var rows = e.target.result.split("\r\n");
                    for (var i = 0; i < rows.length; i++) {
                        var cells = rows[i].split(",");
                        if (cells.length > 1) {
                            var datacsv = {};
                            datacsv.fname = cells[0];
                            datacsv.lname = cells[1];
                            datacsv.username = cells[2];
                            datacsv.email = cells[3];
                            datajson.push(datacsv);
                        }
                    }
                    $("#dvCSV").hide();
                    $("#dvCSV").html('');
                    $("#dvCSV").append(JSON.stringify(datajson));
                }
                reader.readAsText($("#file")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
                enableItemInfoAcc();
            }
        } else {
            alert("Please upload a valid CSV file.");
            enableItemInfoAcc();
        }
    });
    $("#fName").change(function () {
        if ($("#fName").val() != '' || $("#lName").val() != '' || $("#userName").val() != '' || $("#mail").val() != '')
            $("#file").attr('disabled', true);
        else
            $("#file").removeAttr('disabled');
    });
    $("#lName").change(function () {
        if ($("#fName").val() != '' || $("#lName").val() != '' || $("#userName").val() != '' || $("#mail").val() != '')
            $("#file").attr('disabled', true);
        else
            $("#file").removeAttr('disabled');
    });
    $("#userName").change(function () {
        if ($("#fName").val() != '' || $("#lName").val() != '' || $("#userName").val() != '' || $("#mail").val() != '')
            $("#file").attr('disabled', true);
        else
            $("#file").removeAttr('disabled');
    });

    $("#registry365").click(function () {
        var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
        $("#registry365").html(button);
        var item = new Object();
        item.email = $("#email").val();
        item.tenant_id = $("#tenant_id").val();
        item.client_id = $("#client_id").val();
        item.client_secrets = $("#client_secrets").val();;
        item.domain_name = $("#domain_name").val();
        item.optionRegistry = $("#optionRegistry :selected").val();
        if (item.email === '') {
            grecaptcha.reset();
            alert("Please provide Email.");
            $("#registry365").html('Submit');
        } else if (item.tenant_id === '') {
            grecaptcha.reset();
            alert("Please provide Tenant ID.");
            $("#registry365").html('Submit');
        } else if (item.client_ID === '') {
            grecaptcha.reset();
            alert("Please provide Client ID.");
            $("#registry365").html('Submit');
        } else if (item.client_secrets === '') {
            grecaptcha.reset();
            alert("Please provide Client secrets code.");
            $("#registry365").html('Submit');
        } else if (item.domain_name === '') {
            grecaptcha.reset();
            alert("Please provide Domain name.");
            $("#registry365").html('Submit');
        } else if (item.optionRegistry === 'Select registry') {
            grecaptcha.reset();
            alert("Please select a subscription package.");
            $("#registry365").html('Submit');
        } else if (grecaptcha.getResponse().length === 0) {
            grecaptcha.reset();
            alert("Sorry, you must authenticate Recaptcha.");
            $("#registry365").html('Submit');
        }

        if (item.email != '' && item.tenant_id != '' && item.client_id != '' && item.client_secrets != '' &&
            item.domain_name != '' && item.optionRegistry != 'Select registry' && grecaptcha.getResponse().length != 0) {
            var data = JSON.stringify(item);
            disableItemRegistry365();
            clock();
            $.post("/acc365/registry", {
                infoUser: data,
                grecaptcha: grecaptcha.getResponse()
            })
                .done(function (ketqua) {
                    clearInterval(interval);
                    alert(ketqua);
                    showAlert('success', ketqua);
                    enableItemRegistry365();
                    grecaptcha.reset();
                    $("#registry365").html('Submit');
                })
                .fail(function () {
                    clearInterval(interval);
                    showAlert('danger', "Unable to connect to the server, please try again later!");
                    enableItemRegistry365();
                    grecaptcha.reset();
                    $("#registry365").html('Submit');
                })
        }
    });

    $("#getVerificationKey365").click(function () {
        var button = '<i class="fa fa-spinner fa-pulse" style="font-size: 24px;"></i>';
        $("#getVerificationKey365").html(button);
        $.post("/acc365/check", {
            code: $("#verificationKey").val()
        })
            .done(function (ketqua) {
                var obj = JSON.parse(ketqua);
                $('#email').val(obj.email);
                $('#key').val(obj.codes);
                $('#typeKey').val(obj.typecodes);
                $('#totalUsage').val(obj.totalget);
                $('#totalUsed').val(obj.countget);
                if (obj.email === "null") {
                    $("#historycode").attr('disabled', true);
                    $("#history").hide();
                } else {
                    $("#history").show();
                    $("#historycode").removeAttr('disabled');
                }
                showAlert('success', "Verification key successful.");
                $("#getVerificationKey365").html('Submit');
            })
            .fail(function () {
                showAlert('danger', "Unable to connect to the server, please try again later!");
                $("#getVerificationKey365").html('Submit');
            })
    });

    $('#btnSynPid').click(function () {
        var token = $("#tokenSyn").val();
        var optionPIDKEY = $("#optionPIDKEY :selected").val();
        if (token.length === 0) {
            alert("Sorry, Token Synchronization cannot be empty.");
        } else if (optionPIDKEY === "") {
            alert("Sorry, version key is not correct.");
        } else {
            $.post("/get-list-syn-pidkey", {
                token: token,
                optionpidkey: optionPIDKEY,
                grecaptcha: grecaptcha.getResponse()
            })
                .done(function (ketqua) {
                    $("#synPidkeyResult").show();
                    if (ketqua.status === 'done') {
                        $('#datatable').DataTable({
                            destroy: true,
                            data: ketqua.res,
                            columns: [
                                { 'data': 'Id' },
                                { 'data': 'Key' },
                                { 'data': 'Description' },
                                { 'data': 'SubType' },
                                { 'data': 'LicenseType' },
                                { 'data': 'Errorcode' },
                                { 'data': 'MAKCount' }
                            ]
                        });
                    } else {
                        $("#synPidkeyResult").hide();
                        showAlert('danger', ketqua.res);
                    }
                    grecaptcha.reset();
                })
                .fail(function () {
                    $("#synPidkeyResult").hide();
                    showAlert('danger', "Unable to connect to the server, please try again later!");
                    grecaptcha.reset();
                })
        }
    });
})
