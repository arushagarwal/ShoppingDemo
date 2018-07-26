window.addEventListener("load",init);

function init(){
        var cart = useroperations.categorylist;
        console.log("new cart is ",useroperations.categorylist);
        var name = document.querySelector("#name").innerHTML;
        console.log(name);

        var brands = ["lotto","nike","puma","adidas"];
        console.log(brands);
        var category = getCategory(name);
        console.log("category is ",category);
        var box = document.querySelector("#"+name);
        brands.forEach(elem=>{
            console.log(elem);
            document.querySelector("#"+elem).addEventListener("click",()=>{
                console.log(isInCart(cart,elem,category));
                var prod = isInCart(cart,elem,category);
                if(prod[0]==undefined){
                    console.log("sorry the product is not there");
                    document.querySelector("#error").innerHTML="Sorry,there are no products matching your query";
                    box.innerHTML="";
                }
                else{
                // var pr = useroperations.getanycategory("brand",elem);
                document.querySelector("#error").innerHTML="";
                printselected(prod,box);
                }
            })
        });

    document.querySelector("#showall").addEventListener("click",()=>{
        if(name=="topseller"){
        showTopSellers();
        }
        else if(name=="fresh"){
            showFreshArrivals();
        }
        else if(name=="discounted"){
            showDiscountedProducts();
        }
     });

     document.querySelector("#price").addEventListener("click",()=>{
        let modifiedcart = cart.sort((a,b) => {return a.price-b.price});
        printselected(modifiedcart,box);
     })
     document.querySelector("#opp_price").addEventListener("click",()=>{
        let modifiedcart=cart.sort((a,b)=>{return b.price-a.price});
        printselected(modifiedcart,box);
     })
     document.querySelector("#size").addEventListener("click",()=>{
        let modifiedcart=cart.sort((a,b)=>{return a.size-b.size});
        printselected(modifiedcart,box);
     })

}

function isInCart(cart,brand,category){
    var obj = cart.filter(elem=>{
        if(elem.brand==brand){
            // console.log(elem);
            return elem;
        }
    }).filter(elem=>{
        if(elem[category]=="true"){
            return elem;
        }
    })
    return obj;
}

function getCategory(name){
    if(name=="topseller")
        return "isTopSeller";
    else if(name=="fresh")
        return "isFreshArrival";
    else if(name=="discounted")
        return "isDiscounted";
}

function printselected(prod,box){
    box.innerHTML="";
    console.log("inside printing ",prod);
    prod.forEach(object=>{
        console.log("object is ",object);
            var div = document.createElement("div");
            div.style.width="10%";
            var img = document.createElement("img");
            img.src = object.imgarray[0];
            img.style.width="80%";
            img.id=object.id;
            img.addEventListener("click",imageclicked);
            var brand = document.createElement("h2");
            brand.innerHTML=object.brand;
            var price = document.createElement("h4");
            price.innerHTML=object.price;
            box.appendChild(div);
            div.appendChild(img);
            div.appendChild(brand);
            div.appendChild(price);
    })
}



