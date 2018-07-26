window.addEventListener("load",init);

function init(){
    document.querySelector("#submit").addEventListener("click",checkAdmin);
    document.querySelector("#back").addEventListener("click",()=>location.href="firstpage.html");
}

function checkAdmin(){
    var username=document.querySelector("#username").value;
    var pwd = document.querySelector("#password").value;
    var pr = adminoperations.checkLogin();
    
    pr.then(obj=>{
        console.log(obj);
        if(username==obj.username && pwd==obj.password){
            localStorage.setItem("username",username);
            localStorage.setItem("password",pwd);

            if(obj.isfirsttime){
            document.querySelector("#result").innerHTML="Welcome admin, please change your password";
            newPassword();
            obj.isfirsttime=false;
            console.log(obj);
            document.querySelector("#changepwd").addEventListener("click",()=>{
                var newpwd = document.querySelector("#newpwd").value;
                obj.password=newpwd;
                console.log(obj);
                adminoperations.savechanges(obj);
                location.href='admindashboard.html';
            });
            }
            else if(!obj.isfirsttime){
                location.href='admindashboard.html';
            } 
        }
        else
            document.querySelector("#result").innerHTML="incorrect credentials";
    }).catch(err=>console.log("error is "+err));
}

function newPassword(){
    var input = document.createElement("INPUT");
    input.setAttribute("type","password");
    input.setAttribute("id","newpwd");
    input.setAttribute("placeholder","Enter new Password");
    input.className="form-control";
    
    var btn = document.createElement("BUTTON");
    btn.setAttribute("id","changepwd");
    btn.innerHTML="change password";
    btn.className="btn btn-primary";
    
    // btn.addEventListener("click",changepwd);
    
    var span = document.querySelector("#result");
    span.appendChild(input);
    span.appendChild(btn);
}

