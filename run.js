var webdriver = require('selenium-webdriver');
var sleep = require('system-sleep');

exports.url = "http://localhost";
const run = async (data) =>{
	var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

    browser.get('https://my.machinations.io');

    setTimeout(() => { browser.findElement(webdriver.By.id('loginEmail')).sendKeys(data.mail);}, 4000);
    setTimeout(() => { browser.findElement(webdriver.By.id('loginPassword')).sendKeys(data.pass);}, 4000);
    setTimeout(() => { browser.findElement(webdriver.By.className('btn signin-button')).click();}, 5000)

    let start = 40000;
    let step = 10000;
    let result = 0;
    let current_step =0;
    let diag_step
 
    sleep(start); // sleep for 10 seconds
    while(current_step<100){
        sleep(step);
        browser.findElement(webdriver.By.partialLinkText('steps')).getText().then((text)=>{diag_step=text.slice(0,text.indexOf(' '));});
        browser.findElement(webdriver.By.className('m-center-content m-play-ctrl-menu-button m-play-ctrl-menu-quick-plays-bt')).click();
        result+=diag_step-1
        current_step+=1
    }
    result/=100
    return result;
}


module.exports = {run}
