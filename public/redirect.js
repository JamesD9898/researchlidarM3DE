
const cookie = document.cookie.match(/sessionName=([^;]+)/);
const elements = document.querySelectorAll('#prof');
let username;
console.log("scriptloaded")
async function verify(){
    try {
        const response = await fetch('/check');
        const data = await response.json();
        
        // Access the message and username from the JSON response
        const message = data.message;
        username = data.username;
        const status = response.status;

        // Log or use the message and username as needed
        console.log('Message:', message);
        console.log('Username:', username);
        if (status != 200){
            async function signout() {
                await fetch("/signout");
                console.log("cookiedeleted");
            }
            signout();
            window.location.replace('auth.html'); // Redirect after successful sign up
        }

        // Return the message and username or perform other actions
        elements.forEach(element => {
            element.textContent = `Welcome Back ${username}!`;
        });
        return;
    } catch (error) {
        console.error('Error:', error);
        return;
    }
}
verify();

/*if (!cookie) {
        console.log("cookie not found")
        //window.location.replace('../authentication/auth.html'); // Redirect after successful sign up
    } else {
        const response = await fetch('/check', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookie }),
        });
        const data = response.json();
        console.log(response.ok)
        if(!response.ok){
            document.cookie = "sessionName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.replace('../authentication/auth.html'); // Redirect after successful sign u
        } else {
            const varElement = document.createElement('var');
            varElement.textContent = data.username;
        }
    }*/
