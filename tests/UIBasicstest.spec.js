const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{       //javascript can execute multiple test case steps aynchronously, which is why we use await before every step,
    // if we are using await it is necessary to use asynch in function header. Here browser is called a 'Fixture'
        const context= await browser.newContext(); //it fetches a new fresh browser eg: like incognito without any bookmarks or saved data/cookies
        const page= await context.newPage(); //create a new page & saves the output in var page
        const userName=page.locator("#username"); //providing th username locator a variable
        const password=page.locator("[type=password]");
        const signIn=page.locator("#signInBtn");
        const cardTitles=page.locator(".card-body a");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
// suppose for the login page lets validate message for incorrect username / passwd
// now the login page consist of 2 text box one for username and other for passwd, 
//we will need to locate the path for both these textboxes so as to fill in data into it using playwright
// for this we would locator function, using css we can inform our code which textbox should be filled
// for knwoing the ids or attribute we can use inspect element on login page


       await page.locator("#username").fill("rahulshetty")         // locator for username
        await page.locator("[type=password]").fill("learning")      // locator for passwdd
        await page.locator("#signInBtn").click();                   //locator for sign in button so as to be clicked


        console.log(await page.locator("[style*='block']").textContent())
        await expect(page.locator("[style*='block']")).toContainText('Incorrect') // here expect is the assertion and is used to validate the text message of login page with the string in code

        await userName.fill("")    
        await userName.fill("rahulshettyacademy")         
        await signIn.click();  
       // console.log(await cardTitles.first().textContent()); //gets the first position element from array
        //console.log(await cardTitles.nth(1).textContent()); //gets the 0th position element from array
        const allTitles= await cardTitles.allTextContents(); //get whole list
        console.log(allTitles);



});

test ('Page Playwright test', async ({page})=> //test.only >> to only execute that test case
{       // here just by using fixture as page we can skip the code at line 6 & 7
        await page.goto("https://www.google.com/");
        //get page title assertion
        await expect(page).toHaveTitle("Google"); //validates title of the web page
        console.log(await page.title());
});

test('UI Controls', async ({page})=> 
{       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName=page.locator("#username"); //providing th username locator a variable
        const password=page.locator("[type=password]");
        const signIn=page.locator("#signInBtn");
        const dropdown= page.locator('select.form-control') //used (tagname.class) css format in locator fpr the dropdown block
        const documentLink= page.locator("[href*='documents-request']"); //variable to sore blinking text 

        await dropdown.selectOption('consult'); //value needed from the dropdown
        await page.locator('.radiotextsty').last().click();
        await page.locator('#okayBtn').click();
        console.log(page.locator('.radiotextsty').last().isChecked());
        //assertion to validate the correct radio box is selected
        await expect(page.locator('.radiotextsty').last()).toBeChecked(); //validtaes if last radio button is checked
        await page.locator('#terms').click(); //checks the check box
        await expect(page.locator('#terms')).toBeChecked(); //verifies is its checked
        await page.locator('#terms').uncheck(); //unchecks the provided checbox
       // await page.pause();
        //console.log(page.locator('#terms').isChecked());
        expect(await page.locator('#terms').isChecked()).toBeFalsy();

        await expect(documentLink).toHaveAttribute("class","blinkingText");

        //verify when clicked on link it opens new tab (child window )
        
       
});

test.only('Child Window Handling', async ({browser})=> 
{  
        const context= await browser.newContext(); 
        const page= await context.newPage(); //base page
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink= page.locator("[href*='documents-request']");
        const userName=page.locator("#username");
        documentLink.click(); //opens new page
        //create a new context for a new page i.e the child page
     //   const page2=context.waitForEvent('page');  //litens if any new page is opened and then catches in a new page
      //  documentLink.click(); //opens new page
        //A new page wont be opened until bith the above operations execute synchronously/paralelly, so we use promise function to tie both the stattement together
       const [newPage] = await Promise.all( // iterates within the function until the promise gets fulfilled
        [
                context.waitForEvent('page'), //listen for any new page pending, rejected, fulfilled
                documentLink.click(),
        ])

        const text= await newPage.locator(".red").textContent(); //picks the text from new page whose class is .red
        console.log(text);

        const arrayText = text.split('@') //splits the text into 2 parts by @
        const domain=  arrayText[1].split(" ")[0] //splits the new part by " "
        console.log('domain')
        
        await page.locator("#username").fill(domain)
        
        console.log(await page.locator("#username").textContent());


});