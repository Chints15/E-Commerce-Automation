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
        await page.locator("[type=password]").fill("learning1")      // locator for passwdd
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

test.only('Client APP', async ({page})=>
{
        const email="anshika@gmail.com"
        const productName = "ZARA COAT 3"; // name of product which needs to be purchased
        const products = page.locator('.card-body'); // the block of page which holds all the listed products
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.locator('#userEmail').fill(email); //login id & passwd
        await page.locator('#userPassword').fill("Iamking@000");
        await page.locator('#login').click();
        await page.waitForLoadState('networkidle') //waits till all the calls are successfully made so that later  on whole array can be fetched
        const allTitles= await page.locator('.card-body b').allTextContents();
        console.log(allTitles)
        const count = await products.count();

     for (let i=0; i< count; ++i) //iterate through all the products 
        {
                // match the name ZARA COAT 3
                if (await products.nth(i).locator("b").textContent() === productName)

                        {
                                //add to cart
                                await products.nth(i).locator("text= Add To Cart").click(); // click on a Add to Cart button, in locator we have specified that find the locator where the name of button is Add to Cart instead of specifying the css class/tag name
                                break;
                        }
        } 
        await page.locator('[routerlink*="cart"]').click(); //click on cart button
        await page. locator("div li").first().waitFor(); // wait for the first element to load on cart page
        const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // check if product is visible on page
        expect(bool).toBeTruthy();      //assertion to validate the product is same which was added to cart

        await page.locator("text=Checkout").click();
        await page.locator('[value*="2293"]').fill("0000 9931 9292 2293")
        await page.locator(".txt").nth(1).fill("123")
        await page.locator(".txt").nth(2).fill("CHAITANYA VIKRAM NAIR")
        await page.locator(".txt").nth(3).fill("rahlshettyacademy")
        //await page.locator(".btn-primary").click();

        await page.locator("[placeholder*='Country']").pressSequentially("ind") //type characters one by one so that dynamic dropdown appears
        const dropdown =  page.locator(".ta-results"); //class locator of shipping info
        await dropdown.waitFor();
        const dropdowncount= await dropdown.locator("button").count();; //count of drop down objects
        //expect(page.locator(".user__name [type='text']").first()).toHaveText(email);


        for (let i=0;i<dropdowncount;++i) //iterating thorought the count of dropdown available
        {
                const text= await dropdown.locator("button").nth(i).textContent(); 
                        if (text === " India")
                        {
                                console.log()
                                await dropdown.locator("button").nth(i).click() //click india region
                                break;
                        }
        }
        

        expect(page.locator(".user__name [type='text']").first()).toHaveText(email); //validate email of user during placing order
        await page.locator(".action__submit").click(); //click on Place Order btn
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //after placing order verify that the Thanlyou msg appears
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); //store the order id in a variable
        console.log(orderId);

        await page.locator("[routerlink*=myorders]").first().click();
        await page.locator("tbody").waitFor();
        const row = await page.locator("tbody tr")

        for (let i=0;i< await row.count();i++)
        {
                const rowOrderid =  await row.nth(i).locator("th").textContent();
                if(orderId.includes(rowOrderid))
                {
                    await row.nth(i).locator("button").first().click();
                    break;    
                }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();


        await page.pause();

})