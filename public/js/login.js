const id = document.querySelector("#id"),
password = document.querySelector("#password"),
    loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", login);

function login(){
    const req = {
        id: id.value,
        password: password.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success){
                location.href="../index.html";
            } else{
                alert(res.msg);
            }
        })
            .catch((err) => {
                console.error(new Error("로그인 중 에러 발생"));
            });
}