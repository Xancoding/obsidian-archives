const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);


function getCreateTimeAsFileName() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    if (month < 10)  month = '0' + month;
    if (day < 10)    day = '0' + day;
    if (hour < 10)   hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;


    var time = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second;
    return time;
}


// execute command function

async function executeCommand() {
    const fileName = getCreateTimeAsFileName()+".md";
    const { stdout, stderr } = await exec('hugo new posts/' +fileName,{cwd: app.fileManager.vault.adapter.basePath});
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (stdout) {
        new Notice("New Blog Created["+fileName+"]")
    } else {
        new Notice("New Blog Create Faild. "+stderr)
    }
}


module.exports = async function(context, req) {
    await executeCommand();
}
