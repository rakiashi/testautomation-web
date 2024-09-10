import fs from 'fs-extra';

// this asses in cleaning up the playwright-report directory 
try{
    fs.ensureDir('playwright-report')
    fs.ensureDir('allure-report')
    fs.emptyDir('allure-report')
    fs.emptyDir('playwright-report')
    fs.emptyDir('allure-results')

} catch (error){
    console.log('Folder not Created'+ error);
}