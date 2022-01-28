function ValidateKey(key) {
    if (key.length == 0)
        return false;
    var regexKey = new RegExp("^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$");
    return regexKey.test(key);
}

function findKey(listKey) {
    var arrTemp = new Array();
    for (const value of listKey) {
        var result = KeyIdentification(value);
        if (result.length > 0) {
            if (arrTemp.length == 0)
                arrTemp.push(result[0]);
            else if (arrTemp.includes(result[0]) == false)
                arrTemp.push(result[0]);
        }
    }
    return arrTemp;
}

function KeyIdentification(key) {
    var regexKey = new RegExp("[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}");
    var result = regexKey.exec(key)
    if (result != null && ValidateKey(result)) {
        return result;
    }
    else
        return new Array();
}

function ValidateTokenGetcid(token) {
    if (token.length == 0)
        return false;
    var regexKey = new RegExp("[a-z0-9]");
    return regexKey.test(token.toLowerCase());
}

function KeySame(listKey1, listKey2) {
    var listKeySame = new Array();
    for (const value of listKey1) {
        if (listKey2.includes(value)) {
            const textarea = document.getElementById('tbx_sameOP1');
            textarea.value += value.trim() + "\r\n";
            listKeySame.push(value);
        }
        else {
            const textarea = document.getElementById('tbx_sameOP2');
            textarea.value += value.trim() + "\r\n";
        }
    }
    for (const value of listKey2) {
        if (listKeySame.includes(value)==false) {
            const textarea = document.getElementById('tbx_sameOP3');
            textarea.value += value.trim() + "\r\n";
        }
    }
}

function processValidateKey() {
    if (ValidateKey($("#tbx_SpaKey").val())) {
        $("#opt_SptActivate").removeAttr('disabled');
        $("#btn_SptActivate").removeAttr('disabled');
        $("#tbx_SpaTokenGetcid").removeAttr('disabled');
    }
    else {
        $("#opt_SptActivate").attr('disabled', true);
        $("#btn_SptActivate").attr('disabled', true);
        $("#tbx_SpaTokenGetcid").attr('disabled', true);
    }
}

function scriptCMDSptActivate(optionVersion, key, tokenApi) {
    var cmdWindows = "";
    switch (optionVersion) {
        case "1":
            cmdWindows = "cd %windir%\\system32" + "\r\n"
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms" + "\r\n"
            cmdWindows = cmdWindows + "sc config Winmgmt start=demand & net start Winmgmt" + "\r\n"
            cmdWindows = cmdWindows + "sc config LicenseManager start= auto & net start LicenseManager" + "\r\n"
            cmdWindows = cmdWindows + "sc config wuauserv start= auto & net start wuauserv" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "clipup -v -o -altto c:\\" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs -ato" + "\r\n"
            cmdWindows = cmdWindows + "start ms-settings:activation" + "\r\n"
            break;
        case "2":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n"
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky" + "\r\n"
            cmdWindows = cmdWindows + "sc config Winmgmt start=demand & net start Winmgmt" + "\r\n"
            cmdWindows = cmdWindows + "sc config LicenseManager start=auto & net start LicenseManager" + "\r\n"
            cmdWindows = cmdWindows + "sc config wuauserv start=auto & sc start wuauserv" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dti>C:\\IID.txt" + "\r\n"
            cmdWindows = cmdWindows + "start C:\\IID.txt" + "\r\n"
            break;
        case "3":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n"
            cmdWindows = cmdWindows + "set key=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=6 delims=[.] \" %a in ('ver') do set ver=%a" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc >nul 2>&1" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk >nul 2>&1" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms >nul 2>&1" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky >nul 2>&1" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %key%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dti>C:\\IID.txt" + "\r\n"
            cmdWindows = cmdWindows + "start C:\\IID.txt" + "\r\n"
            break;
        case "4":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "set codes=" + tokenApi + "" + "\r\n"
            cmdWindows = cmdWindows + "set key=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "echo off | clip&cls" + "\r\n"
            cmdWindows = cmdWindows + "sc config LicenseManager start= auto & net start LicenseManager" + "\r\n"
            cmdWindows = cmdWindows + "sc config wuauserv start= auto & net start wuauserv" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %key%&cls" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=3\" %b in ('cscript.exe %windir%\\system32\\slmgr.vbs /dti') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=*\" %b in ('powershell -Command \"$req = [System.Net.WebRequest]::Create('https://getcid.info/api/%IID%/%codes%');$resp = New-Object System.IO.StreamReader $req.GetResponse().GetResponseStream(); $resp.ReadToEnd()\"') do set ACID=%b" + "\r\n"
            cmdWindows = cmdWindows + "set CID=%ACID:~1,48%" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /atp %CID%" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ato" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=: / \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo CID: %ACID% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dli >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /xpr >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start ms-settings:activation" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            break;
        case "5":
            cmdWindows = cmdWindows + "sc config LicenseManager start= auto & net start LicenseManager" + "\r\n"
            cmdWindows = cmdWindows + "sc config wuauserv start= auto & net start wuauserv" + "\r\n"
            cmdWindows = cmdWindows + "changepk.exe /productkey VK7JG-NPHTM-C97JM-9MPGT-3V66T" + "\r\n"
            cmdWindows = cmdWindows + "exit" + "\r\n"
            break;
        case "6":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n"
            break;
        case "7":
            cmdWindows = cmdWindows + "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")" + "\r\n"
            cmdWindows = cmdWindows + "If exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens= 8\" %b in ('cscript //nologo OSPP.VBS /dstatus ^| findstr /b /c:\"Last 5\"') do (cscript //nologo ospp.vbs /unpkey:%b)" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "set codes=" + tokenApi + "" + "\r\n"
            cmdWindows = cmdWindows + "set key=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "echo off | clip&cls" + "\r\n"
            cmdWindows = cmdWindows + "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office1%a\"))&cls" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%key%" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=*\" %b in ('powershell -Command \"$req = [System.Net.WebRequest]::Create('https://getcid.info/api/%IID%/%codes%');$resp = New-Object System.IO.StreamReader $req.GetResponse().GetResponseStream(); $resp.ReadToEnd()\"') do set ACID=%b" + "\r\n"
            cmdWindows = cmdWindows + "set CID=%ACID:~1,48%" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /actcid:%CID%" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo CID: %ACID%>>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            break;
        case "8":
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office14\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\")" + "\r\n"
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dinstid>id.txt " + "\r\n"
            cmdWindows = cmdWindows + "start id.txt" + "\r\n"
            break;
            break;
        case "9":
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office15\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\")" + "\r\n"
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dinstid>id.txt" + "\r\n"
            cmdWindows = cmdWindows + "start id.txt" + "\r\n"
            break;
        case "10":
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\")" + "\r\n"
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dinstid>id.txt " + "\r\n"
            cmdWindows = cmdWindows + "start id.txt" + "\r\n"
            break;
        case "11":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\"" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\"" + "\r\n"
            cmdWindows = cmdWindows + "for /f %i in ('dir /b ..\\root\\Licenses16\\ProPlus2019VL_MAK_AE*.xrm-ms') do cscript ospp.vbs /inslic:\"..\\root\\Licenses16\\%i\"" + "\r\n"
            cmdWindows = cmdWindows + "for /f %i in ('dir /b ..\\root\\Licenses16\\ProPlus2019VL_KMS_Client_AE*.xrm-ms') do cscript ospp.vbs /inslic:\"..\\root\\Licenses16\\%i\"" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n"
            break;
        case "12":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\"" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\"" + "\r\n"
            cmdWindows = cmdWindows + "for /f %i in ('dir /b ..\\root\\Licenses16\\ProPlus2021VL_MAK_AE*.xrm-ms') do cscript ospp.vbs /inslic:\"..\\root\\Licenses16\\%i\"" + "\r\n"
            cmdWindows = cmdWindows + "for /f %i in ('dir /b ..\\root\\Licenses16\\ProPlus2021VL_KMS_Client_AE*.xrm-ms') do cscript ospp.vbs /inslic:\"..\\root\\Licenses16\\%i\"" + "\r\n"
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n"
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n"
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n"
            break;
        default:
            cmdWindows = "";
    }
    return cmdWindows;
}

function scriptCMDCheckRemove(optionVersion) {
    var cmdWindows = "";
    switch (optionVersion) {
        case "1":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=: / \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=3\" %b in ('cscript.exe %windir%\\system32\\slmgr.vbs /dti') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dli >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript slmgr.vbs /xpr >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            break;
        case "2":
            cmdWindows = cmdWindows + "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))" + "\r\n"
            cmdWindows = cmdWindows + "cls" + "\r\n"
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            break;
        case "3":
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office14\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\")" + "\r\n"
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            break;
        case "4":
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office15\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\")" + "\r\n"
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            break;
        case "5":
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\")" + "\r\n"
            cmdWindows = cmdWindows + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\")" + "\r\n"
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n"
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n"
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n"
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n"
            cmdWindows = cmdWindows + "start status.txt" + "\r\n"
            break;
        case "6":
            cmdWindows = cmdWindows + "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")" + "\r\n"
            cmdWindows = cmdWindows + "If exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))" + "\r\n"
            cmdWindows = cmdWindows + "for /f \"tokens= 8\" %b in ('cscript //nologo OSPP.VBS /dstatus ^| findstr /b /c:\"Last 5\"') do (cscript //nologo ospp.vbs /unpkey:%b)" + "\r\n"
            break;
        case "7":
            cmdWindows = "cscript ospp.vbs /unpkey:"
            break;
        default:
            cmdWindows = "";
            break;
    }
    return cmdWindows;
}

$(document).ready(function () {
    $("#opt_SptActivate").attr('disabled', true);
    $("#btn_SptActivate").attr('disabled', true);
    $("#tbx_SpaTokenGetcid").attr('disabled', true);
    $("#tbx_SpaTokenGetcid").hide();

    $("#tbx_SpaKey").keyup(function () {
        processValidateKey()
    });
    $("#tbx_SpaKey").change(function () {
        processValidateKey()
    });

    $('#opt_SptActivate').change(function () {
        var copyText = $("#opt_SptActivate :selected").val();
        var key = $("#tbx_SpaKey").val();
        var tokenGetcid = $("#tbx_SpaTokenGetcid input").val();
        if (copyText == "4" || copyText == "7") {
            $("#tbx_SpaTokenGetcid").show();
            $("#tbx_SpaTokenGetcid").removeAttr('disabled');
            $("#lenhCMDOne").val('');
        }
        else {
            $("#tbx_SpaTokenGetcid").attr('disabled', true);
            $("#tbx_SpaTokenGetcid").hide();
            $("#lenhCMDOne").val(scriptCMDSptActivate(copyText, key, tokenGetcid));
        }
        if ($("#lenhCMDOne").val().length > 0)
            copyTextToClipboard($("#lenhCMDOne").val());
    });

    $('#btn_SptActivate').click(function () {
        var copyText = $("#opt_SptActivate :selected").val();
        var key = $("#tbx_SpaKey").val();
        var tokenGetcid = $("#tbx_SpaTokenGetcid input").val();
        if (copyText == "4" || copyText == "7") {
            if (ValidateTokenGetcid(tokenGetcid)) {
                $("#lenhCMDOne").val(scriptCMDSptActivate(copyText, key, tokenGetcid));
            }
            else {
                alert("Token getcid cannot be empty.");
            }
        }
        else {
            $("#lenhCMDOne").val(scriptCMDSptActivate(copyText, key, tokenGetcid));
        }
        if ($("#lenhCMDOne").val().length > 0)
            copyTextToClipboard($("#lenhCMDOne").val());
    });

    $('#spa_optCheckRemove').change(function () {
        var copyText = $("#spa_optCheckRemove :selected").val();
        $("#lenhCMDThree").val(scriptCMDCheckRemove(copyText));
        if ($("#lenhCMDThree").val().length > 0)
            copyTextToClipboard($("#lenhCMDThree").val());
    });

    $('#btn_CheckRemove').click(function () {
        var copyText = $("#spa_optCheckRemove :selected").val();
        $("#lenhCMDThree").val(scriptCMDCheckRemove(copyText));
        if ($("#lenhCMDThree").val().length > 0)
            copyTextToClipboard($("#lenhCMDThree").val());
    });

    $('#btn_sameCheckSourceIP').click(function () {
        $("#tbx_sameOP1").val('');
        $("#tbx_sameOP2").val('');
        $("#tbx_sameOP3").val('');
        var listKey1 = new Array();
        var listKey2 = new Array();
        var i = 0;
        var items = $("#tbx_sameIP1").val().toUpperCase().split('\n');
        for (i = 0; i <= items.length - 1; i++) {
            var elems = items[i].split('\n');
            listKey1.push(elems[0].trim());
        }
        listKey1 = findKey(listKey1);

        items = $("#tbx_sameIP2").val().toUpperCase().split('\n');
        for (i = 0; i <= items.length - 1; i++) {
            var elems = items[i].split('\n');
            listKey2.push(elems[0].trim());
        }
        listKey2 = findKey(listKey2);
        KeySame(listKey1, listKey2);
    });

    $('#btn_sameCleanSourceIP').click(function () {
        $("#tbx_sameIP1").val('');
        $("#tbx_sameIP2").val('');
        $("#tbx_sameOP1").val('');
        $("#tbx_sameOP2").val('');
        $("#tbx_sameOP3").val('');
    });

    $('#btn_sameCleanSourceIP1').click(function () {
        $("#tbx_sameIP1").val('');
    });

    $('#btn_sameCleanSourceIP2').click(function () {
        $("#tbx_sameIP2").val('');
    });

    $('#btn_sameCleanSourceOP1').click(function () {
        $("#tbx_sameOP1").val('');
    });

    $('#btn_sameCleanSourceOP2').click(function () {
        $("#tbx_sameOP2").val('');
    });

    $('#btn_sameCleanSourceOP3').click(function () {
        $("#tbx_sameOP3").val('');
    });

    $('#btn_sameCopySourceOP1').click(function () {
        copyTextToClipboard($("#tbx_sameOP1").val());
    });

    $('#btn_sameCopySourceOP2').click(function () {
        copyTextToClipboard($("#tbx_sameOP2").val());
    });

    $('#btn_sameCopySourceOP3').click(function () {
        copyTextToClipboard($("#tbx_sameOP3").val());
    });

});