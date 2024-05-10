async function verify(){
    try {
        const response = await fetch('/check');
        const data = await response.json();
        
        // Access the message and username from the JSON response
        const message = data.message;
        const username = data.username;
        const status = response.status;

        // Log or use the message and username as needed
        console.log('Message:', message);
        console.log('Username:', username);
        if (status == 200){
            window.location.replace('index.html'); // Redirect after successful sign up
        }

        // Return the message and username or perform other actions
        return "[message, username]";
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    /*const cookie = document.cookie.match(/sessionName=([^;]+)/);
    console.log(cookie)
    if (cookie) {
        console.log("cookie found")
        window.location.replace('../dashboard/dashboard.html'); // Redirect after successful sign up
    }*/
    console.log(verify())
    const signupError = document.getElementById('signupError');
    const loginError = document.getElementById('loginError');
    document.getElementById('signupForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('emailsign').value;
        const username = document.getElementById('textsign').value;
        const password = document.getElementById('passwordsign').value;

        // Minimum character requirement for username and password
        const minCharacters = 5;
        const maxCharacters = 60;

        
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email));
        if (!re.test(email)){
            signupError.textContent = `Not a valid Email Address`;
            return;
        }


        if (username.length < minCharacters || password.length < minCharacters || email.length > maxCharacters || password.length > maxCharacters || username.length > maxCharacters) {
            signupError.textContent = `Username and password must be at least ${minCharacters} and no more than ${maxCharacters} characters long. Email also must be no longer than ${maxCharacters} characters long.`;
            return;
        }

        const signupURL = '/signup'; // Replace with your backend signup endpoint

        try {
            const response = await fetch(signupURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                window.location.replace('index.html'); // Redirect after successful sign up
                console.log(response)
            } else {
                const data = await response.json();
                signupError.textContent = data.message; // Display server error message
            }
        } catch (error) {
            console.error('Error:', error);
            signupError.textContent = 'Error occurred during signup. Please try again.';
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('textlog').value;
        const password = document.getElementById('passwordlog').value;

        const loginURL = '/login'; // Replace with your backend login endpoint

        try {
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json()
                console.log(data.session)
                //document.cookie = `sessionName=${data.session};path=/`
                window.location.replace('index.html'); // Redirect after successful login
            } else {
                const data = await response.json();
                loginError.textContent = data.message; // Display server error message
            }
        } catch (error) {
            console.error('Error:', error);
            loginError.textContent = 'Error occurred during login. Please try again.';
        }
    });
});
