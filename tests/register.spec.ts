import { expect, test } from '@playwright/test';
import { Loginpage } from '../pages/Loginpage';
import { RegisterPage } from '../pages/RegisterPage';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

//schema/type of reg data fields
type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
const registerationData:RegData[]  = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});

for (const user of registerationData) {
    test(`verify user is able to register ${user.lastName} @regression`, async ({ page, baseURL }) => {
    
        const loginPage = new Loginpage(page);
        await loginPage.goTologinPage(baseURL);
        const registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
        const isUserRegistered: boolean = await registerPage.registerUser(
            user.firstName,
            user.lastName,
            getRandomEmail(),
            user.telephone,
            user.password,
            user.subscribeNewsletter);
        expect(isUserRegistered).toBeTruthy();

    });
}

function getRandomEmail() : string{
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}



