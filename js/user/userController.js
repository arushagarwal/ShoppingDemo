window.addEventListener("load",init);

function init(){
    console.log("inside init");
    if(document.querySelector("#topseller")){
    showTopSellers();
    }
    if(document.querySelector("#fresh")){
    showFreshArrivals();
    }
    if(document.querySelector("#discounted")){
    showDiscountedProducts();
    }
    if(document.querySelector("#all")){
    showAll();
    }
    document.querySelector("#cartimg").addEventListener("click",showcart);
}

function showTopSellers(){
    console.log("inside showTopsellers");
    var pr = useroperations.getanycategory("isTopSeller","true");
    var topsellerbox = document.querySelector("#topseller");
    printitems(pr,topsellerbox);
}

function showFreshArrivals(){
    console.log("fresh arrivals");
    var pr = useroperations.getanycategory("isFreshArrival","true");
    var freshbox = document.querySelector("#fresh");
    printitems(pr,freshbox);
}

function showDiscountedProducts(){
    console.log("discounted ");
    var pr = useroperations.getanycategory("isDiscounted","true");
    var discountbox = document.querySelector("#discounted");
    printitems(pr,discountbox);
}

function showAll(){
    var pr = useroperations.getAll();
    var allbox = document.querySelector("#all");
    printitems(pr,allbox);
}

function printitems(pr,box){
    box.innerHTML="";
    console.log("hello");
    pr.then(object=>{
        for(let key in object){
        
            var div = document.createElement("div");
            div.style.width="10%";
            var img = document.createElement("img");
            img.src = object[key].imgarray[0];
            img.style.width="80%";
            img.id=object[key].id;
            img.addEventListener("click",imageclicked);
            var brand = document.createElement("h2");
            brand.innerHTML=object[key].brand;
            var price = document.createElement("h4");
            price.innerHTML=object[key].price;
            box.appendChild(div);
            div.appendChild(img);
            div.appendChild(brand);
            div.appendChild(price);
        }
    }).catch(err=>console.log("error is "+err));
}

function imageclicked(){
    var img = event.srcElement;
    img.setAttribute("data-toggle","modal");
    img.setAttribute("data-target","#exampleModalCenter");
    var pr = useroperations.searchById(img.id);
    pr.then(object=>{
        console.log(object);
        modalPrint(object);
    })
}

function modalPrint(object){
    
    var imgdiv = document.querySelector("#images");
    imgdiv.innerHTML="";
    for(key in object.imgarray){
        var img = document.createElement("img");
        img.src=object.imgarray[key];
        imgdiv.appendChild(img);
    }
    document.querySelector("#brand").innerHTML=object.brand;
    document.querySelector("#category").innerHTML=object.category;
    document.querySelector("#price").innerHTML=object.price;
    document.querySelector("#color").style.backgroundcolor=object.color;
    document.querySelector("#desc").innerHTML=object.desc;

    document.querySelector("#addtocart").addEventListener("click",()=>{
        saveToCart(object);
    });
}

function saveToCart(obj){

    useroperations.cart=JSON.parse(localStorage.getItem("cart"));

    if(useroperations.cart.length==0){
        console.log("inside first time");
        useroperations.cart.push(obj);
        localStorage.setItem("cart",JSON.stringify(useroperations.cart));
        console.log("cart is "+useroperations.cart);
    }

    else if(useroperations.cart.length!=0){
        console.log("inside second");
    var json=localStorage.getItem("cart");
    useroperations.cart=JSON.parse(json);
    console.log(obj);
    console.log("cart is "+useroperations.cart);
  
    useroperations.cart = useroperations.cart.filter(currobj=>{
        if(currobj.id!=obj.id){
            return currobj;
        }
    })
    
    useroperations.cart.push(obj);
    localStorage.setItem("cart",JSON.stringify(useroperations.cart));
    console.log("cart is "+useroperations.cart);
}
    else{
        console.log("outside");
    }
}

function showcart(){
    var cart = document.querySelector(".cart");
    cart.innerHTML="";
    cart.classList.toggle("hide");
    useroperations.cart=JSON.parse(localStorage.getItem("cart"));
    
    if(useroperations.cart.length==0){
        cart.innerHTML="Empty Cart, First Buy Something";
    }
    else{
        var ul = document.createElement("ul");
        ul.className="list-group";
        cart.appendChild(ul);
        useroperations.cart.forEach(obj=>{
            var li = document.createElement("li");
            li.className="list-group-item";
            var img = document.createElement("img");
            img.src=obj.imgarray[0];
            
            li.innerHTML="<img src="+obj.imgarray[0]+">"+"  "+obj.brand+"  "+obj.size+"  "+obj.price+"<button id="+'cartdlt'+""+obj.id+" class="+'btn-danger'+">Delete</button>";
            ul.appendChild(li);

            document.querySelector("#cartdlt"+obj.id).addEventListener("click",()=>{
                deleteitem(obj.id);
            });
           
            // var deleteicons = document.querySelectorAll("#cartdlt");
            // deleteicons.forEach(obj=>{
            // obj.addEventListener("click",()=>console.log("hello"));
            
            // })
        
        })
        // cart.appendChild(ul);
        
    }
}

function deleteitem(id){
    useroperations.cart=JSON.parse(localStorage.getItem("cart"));
    useroperations.cart = useroperations.cart.filter(obj=>{
        if(obj.id!=id)
            return obj;
    })
    localStorage.setItem("cart",JSON.stringify(useroperations.cart));
    console.log("new cart is "+useroperations.cart);
    showcart();
}