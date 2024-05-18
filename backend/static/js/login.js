function handleSlide(){
    var a, b, c, d;
    a = document.getElementById("one");
    b = document.getElementById("two");
    c = document.getElementById("three");
    d = document.getElementById("four");
    d.classList.add("mover");
    a.classList.add("hide");
    a.classList.remove("show");
    c.classList.add("movel2");
    b.classList.add("hide");
    b.classList.remove("show");
    c.classList.remove("hide");
    c.classList.add("show");
    d.classList.remove("hide");
    d.classList.add("show");
}
function handleSwipe(){
    var a, b, c, d;
    a = document.getElementById("one");
    b = document.getElementById("two");
    c = document.getElementById("three");
    d = document.getElementById("four");
    b.classList.add("mover2");
    c.classList.add("hide");
    c.classList.remove("show");
    a.classList.add("movel");
    d.classList.add("hide");
    d.classList.remove("show");
    b.classList.remove("hide");
    b.classList.add("show");
    a.classList.remove("hide");
    a.classList.add("show");
}

async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    console.log(result);
    const message = document.getElementById('signup-message');
    message.textContent = result.message || result.error;
    message.style.color = response.ok ? 'green' : 'red';
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    try{
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    
        const result = await response.json();
        console.log(result);
        alert(result.message);
        if (response.ok) {
            window.location.href = result.redirect;
        }
        const message = document.getElementById('login-message');
        message.textContent = result.message || result.error;
        message.style.color = response.ok ? 'green' : 'red';
    }
    catch(err){
        console.log(err)
    }
    
}