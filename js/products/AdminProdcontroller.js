redirect();
window.addEventListener("load",init);

function redirect(){
    if(!localStorage.username && !localStorage.password){
        location.href="adminlogin.html";
    }
}

function init(){
    printAll();
    document.querySelector("#additem").addEventListener("click",additem);
    document.querySelector("#deleteitems").addEventListener("click",deleteitems);
    document.querySelector("#updateitem").addEventListener("click",updateitem);
    document.querySelector("#searchbtn").addEventListener("click",searchById);
    document.querySelector("#logout").addEventListener("click",()=>{
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        location.href="adminlogin.html";
    });
    document.querySelector("#category").addEventListener("change",()=>{
        var select = document.querySelector("#category");
        if(select.options[select.selectedIndex].id=="topseller"){
            var pr = adminoperations.fetchCategory("isTopSeller");
            printitems(pr);
        }
        else if(select.options[select.selectedIndex].id=="fresh"){
            var pr = adminoperations.fetchCategory("isFreshArrival");
            printitems(pr);
        }
        else if(select.options[select.selectedIndex].id=="discounted"){
            var pr = adminoperations.fetchCategory("isDiscounted");
            printitems(pr);
        }
        else{
        console.log("outside");
        printAll();
        }
    });

    document.querySelector("#sort").addEventListener("change",()=>{
        var sort = document.querySelector("#sort");
        if(sort.options[sort.selectedIndex].id=="byprice"){
            var pr = adminoperations.sort("price");
            printitems(pr);
        }
        else if(sort.options[sort.selectedIndex].id=="bysize"){
            var pr = adminoperations.sort("size");
            printitems(pr);
        }
        else if(sort.options[sort.selectedIndex].id=="byname"){
            var pr = adminoperations.sort("brand");
            printitems(pr);
        }
        else if(sort.options[sort.selectedIndex].id=="bydiscount"){
            var pr = adminoperations.sort("discount");
            printitems(pr);
        }
        else{
            printAll();
        }
    })
}

function additem(){
    document.querySelector("#myform").classList.toggle("hide");
    if(document.querySelector("#myform").className!="hide"){
        createform();
        var addbtn = document.createElement("button");
        addbtn.innerHTML="Add product";
        addbtn.className="btn btn-primary";
        addbtn.addEventListener("click",saveValues);
        document.querySelector("#form").appendChild(addbtn);   
    }
}
function updateitem(){
    createform();
    var editbtn = document.createElement("button");
    editbtn.innerHTML="Edit product";
    editbtn.className="btn btn-primary";
    editbtn.addEventListener("click",savechangedValues);
    document.querySelector("#form").appendChild(editbtn); 

    
    var obj = adminoperations.markedlist[0];
    
    for(let key in obj.imgarray){
        var img = document.createElement("img");
        img.src = obj.imgarray[key];
        img.id="img"+(++key);
        document.querySelector("#imgdiv").appendChild(img);

    }
    document.querySelector("#brand").value=obj.brand;
    document.querySelector("#color").value=obj.color;
    document.querySelector("#size").value=obj.size;
    document.querySelector("#price").value=obj.price;
    document.querySelector("#isdisc").value=obj.isdisc;
    document.querySelector("#discount").value=obj.discount;
    var x = document.querySelector("#myselect");
    x.options[x.selectedIndex].text=obj.gender;
    document.querySelector("#desc").value=obj.desc;
}
function createform(){
   
    var form = document.createElement("div");
    form.id="form";
   
    var imgtitle = document.createElement("legend");
     imgtitle.innerHTML="Add images here";
    
    var imgurl = document.createElement("input");
    imgurl.setAttribute("type","text");
    imgurl.placeholder="Enter image url";
    imgurl.className="form-control";
    
    var btn = document.createElement("button");
    btn.className="btn btn-success";
    btn.innerHTML="Upload";

    var div = document.createElement("div");
    div.id="imgdiv";

    var imgid = 1;

    btn.addEventListener("click",()=>{
        var img = document.createElement("img");
        img.src = imgurl.value;
        div.appendChild(img);
        imgurl.value="";
        img.id="img"+imgid++;
    })

    var brandlabel = document.createElement("label");
    brandlabel.innerHTML="Brand Name: "
    var brand = document.createElement("input");
    brand.placeholder="Enter Brand Name";
    brand.id="brand";
    brand.className="form-control";

    var colorlabel = document.createElement("label");
    colorlabel.innerHTML="Color:  "
    var color = document.createElement("input");
    color.innerHTML="Chose color";
    color.type="color";
    color.id="color";
    
    var br = document.createElement("br");

    var sizelabel = document.createElement("label");
    sizelabel.innerHTML="Size:  ";
    var size = document.createElement("input");
    size.type="number";
    size.id="size";
    size.className="form-control";
    
    var pricelabel = document.createElement("label");
    pricelabel.innerHTML="Price:   ";
    var price = document.createElement("input");
    price.type="number";
    price.id="price";
    price.className="form-control";

    var isdisc = document.createElement("input");
    isdisc.type="checkbox";
    isdisc.id="isdisc";
    isdisc.value=false;
    var disclabel = document.createElement("label");
    disclabel.innerHTML="want to give discount on this product??";
    var discount = document.createElement("input");
    discount.type="number";
    discount.id="discount";
    discount.disabled=true;
    isdisc.addEventListener("click",()=>{
        if(isdisc.checked){
            discount.disabled=false; 
            discount.placeholder="Discount %";
            isdisc.value=true;
        }
        else{
            discount.disabled=true;
            discount.placeholder="";
            isdisc.value=false;
            discount.value="";
        }  
    })
    
    var select = document.createElement("select");
    select.className="form-control";
    select.id="myselect";
    var option1 = document.createElement("option");
    option1.text="Select Gender";
    select.appendChild(option1);
    var option2 = document.createElement("option");
    option2.text="Male";
    option2.value="male";
    select.appendChild(option2);
    var option3 = document.createElement("option");
    option3.text="Female";
    option3.value="female";
    select.appendChild(option3);
    var option4 = document.createElement("option");
    option4.text="Children";
    option4.value="children";
    select.appendChild(option4);
    console.log(option4.innerHTML);

    var topsellerlabel = document.createElement("label");
    topsellerlabel.innerHTML="Is Product Gaining Popularity????";
    var br2 = document.createElement("br");
    var radbtn1 = document.createElement("input");
    radbtn1.type="radio";
    radbtn1.name="isradbtn";
    radbtn1.value="true";
    radbtn1.checked="true";
    radbtn1.id="radbtn";
    var radbtn1lbl = document.createElement("label");
    radbtn1lbl.innerHTML="Yes";
    var radbtn2 = document.createElement("input");
    radbtn2.type="radio";
    radbtn2.name="isradbtn";
    radbtn2.value="false";
    radbtn2.id="radbtn";
    var radbtn2lbl = document.createElement("label");
    radbtn2lbl.innerHTML="No";

    var br3 = document.createElement("br");

    var freshlabel = document.createElement("label");
    freshlabel.innerHTML="Fresh Product????";
    var br2 = document.createElement("br");
    var freshbtn1 = document.createElement("input");
    freshbtn1.type="radio";
    freshbtn1.name="isfresh";
    freshbtn1.value="true";
    freshbtn1.checked="true";
    var freshbtn1lbl = document.createElement("label");
    freshbtn1lbl.innerHTML="Yes";
    var freshbtn2 = document.createElement("input");
    freshbtn2.type="radio";
    freshbtn2.name="isfresh";
    freshbtn2.value="false";
    var freshbtn2lbl = document.createElement("label");
    freshbtn2lbl.innerHTML="No";

    var desclabel = document.createElement("label");
    desclabel.innerHTML="Enter description of product";
    var desc = document.createElement("textarea");
    desc.id="desc";
    desc.className="form-control";


    var myform = document.querySelector("#myform");
    myform.appendChild(form);

    
    form.appendChild(imgtitle);
    form.appendChild(imgurl);
    form.appendChild(btn)
    form.appendChild(div);
    
    form.appendChild(brandlabel);
    form.appendChild(brand);

    form.appendChild(colorlabel);
    form.appendChild(color);
    
    form.appendChild(br);

    form.appendChild(sizelabel);
    form.appendChild(size);

    form.appendChild(pricelabel);
    form.appendChild(price);

    form.appendChild(isdisc);
    form.appendChild(disclabel);
    form.appendChild(discount);

    form.appendChild(select);

    form.appendChild(topsellerlabel);
    form.appendChild(br2);
    form.appendChild(radbtn1);
    form.appendChild(radbtn1lbl);
    form.appendChild(radbtn2);
    form.appendChild(radbtn2lbl);

    form.appendChild(br3);
    form.appendChild(freshlabel);
    form.appendChild(freshbtn1);
    form.appendChild(freshbtn1lbl);
    form.appendChild(freshbtn2);
    form.appendChild(freshbtn2lbl);

    form.appendChild(br);

    form.appendChild(desclabel);
    form.appendChild(desc);
}

function saveValues(){
    var imglist=[];
    var count = document.querySelector("#imgdiv").childElementCount;
    console.log(count);
    for(let i=1;i<=count;i++){
        var imgurl = document.querySelector("#img"+i).src;
        imglist.push(imgurl);
    }

    console.log(imglist);

    var brand = document.querySelector("#brand").value;

    var color = document.querySelector("#color").value;

    var size = document.querySelector("#size").value;

    var price = document.querySelector("#price").value;

    var isdisc = document.querySelector("#isdisc").value;
    var discount = document.querySelector("#discount").value;

    var x = document.querySelector("#myselect");
    var gender = x.options[x.selectedIndex].text;

    var radios = document.getElementsByName("isradbtn");
    for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            var isTopSeller = radios[i].value;
            console.log(isTopSeller);
        }
        else
            continue;
    }

    var fresh = document.getElementsByName("isfresh");
    for(let i=0;i<fresh.length;i++){
        if(fresh[i].checked){
            var isFreshArrival = fresh[i].value;
            console.log("is fresh arrival     ",isFreshArrival);
        }
        else
            continue;
    }


    var desc = document.querySelector("#desc").value;

    if(isdisc==false){
        discount=0;
    }

    adminoperations.addProduct(imglist,brand,color,size,price,isdisc,discount,gender,desc,isTopSeller,isFreshArrival);

    var form = document.querySelector("#form");
    form.parentNode.removeChild(form);
    printAll();
}
function savechangedValues(){
    var imglist=[];
    var count = document.querySelector("#imgdiv").childElementCount;
    
    for(let i=1;i<=count;i++){
        var imgurl = document.querySelector("#img"+i).src;
        imglist.push(imgurl);
    }

    console.log(imglist);

    var brand = document.querySelector("#brand").value;

    var color = document.querySelector("#color").value;

    var size = document.querySelector("#size").value;

    var price = document.querySelector("#price").value;

    var isdisc = document.querySelector("#isdisc").value;
    var discount = document.querySelector("#discount").value;

    var x = document.querySelector("#myselect");
    var gender = x.options[x.selectedIndex].text;

    var radios = document.getElementsByName("isradbtn");
    for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            var isTopSeller = radios[i].value;
            console.log(isTopSeller);
        }
        else
            continue;
    }

    var fresh = document.getElementsByName("isfresh");
    for(let i=0;i<fresh.length;i++){
        if(fresh[i].checked){
            var isFreshArrival = fresh[i].value;
            console.log("is fresh arrival     ",isFreshArrival);
        }
        else
            continue;
    }

    var desc = document.querySelector("#desc").value;

    adminoperations.editProduct(adminoperations.markedlist[0].id,imglist,brand,color,size,price,isdisc,discount,gender,desc,isTopSeller,isFreshArrival);

    var form = document.querySelector("#form");
    form.parentNode.removeChild(form);
    printAll();
}
function printAll(){
    var pr = adminoperations.fetchAll();
    printitems(pr);
}
function printitems(pr){
    var tbody = document.querySelector("#productlist");
    tbody.innerHTML="";

    pr.then(object=>{
        console.log(object);
        for(let key in object){
            // console.log("key is  "+key);
            // console.log(object[key]);
            var tr = tbody.insertRow();
            var index=0;

            var checkbox = document.createElement("input");
            checkbox.type="checkbox";
            checkbox.id=object[key].id;
            tr.insertCell(index).appendChild(checkbox);  
            checkbox.addEventListener("click",()=>{
                var obj = selectProd(object[key]);
                console.log(obj);
                if(obj.selected){
                    adminoperations.markedlist.push(obj);
                    console.log(adminoperations.markedlist);
                }
                else if(!obj.selected){
                    adminoperations.markedlist=adminoperations.markedlist.filter(object=>{
                        if(object.id!=obj.id){
                            return object;
                        }
                    })
                    console.log(adminoperations.markedlist);
                }
            })

            tr.insertCell(index).appendChild(checkbox);  
            index++;

            for(let k in object[key]){
                
                if(k=="isFreshArrival" || k=="isTopSeller" || k=="outOfStock" || k=="selected"){
                    continue;
                }
                if(k=="imgarray"){
                    for(let i in object[key][k]){
                        var img = document.createElement("img");
                        img.src=object[key][k][i];
                        tr.insertCell(index).appendChild(img);
                        index++;
                    }
                }
                else{
                tr.insertCell(index).innerHTML = object[key][k];
                index++;
                }                   
            }
        }
    }).catch(err=>console.log("Error is "+err));
}

// function printlist(list){
//     var tbody = document.querySelector("#productlist");
//     tbody.innerHTML="";

//     list.forEach(obj=>{
//         var tr = tbody.insertRow();
//         var index=0;

//         var checkbox = document.createElement("input");
//         checkbox.type="checkbox";
//         checkbox.id=obj.id;
//         tr.insertCell(index).appendChild(checkbox);  
//         checkbox.addEventListener("click",()=>{
//             var object = selectProd(obj);
//             console.log(object);
//             if(object.selected){
//                 adminoperations.markedlist.push(object);
//                 console.log(adminoperations.markedlist);
//             }
//             else if(!object.selected){
//                 adminoperations.markedlist=adminoperations.markedlist.filter(object1=>{
//                     if(object1.id!=obj.id){
//                         return object1;
//                     }
//                 })
//                 console.log(adminoperations.markedlist);
//             }
//         })
//         tr.insertCell(index).appendChild(checkbox);  
//         index++;

//         for(let k in obj){
                
//             if(k=="isFreshArrival" || k=="isTopSeller" || k=="outOfStock" || k=="selected"){
//                 continue;
//             }
//             if(k=="imgarray"){
//                 for(let i in obj[k]){
//                     var img = document.createElement("img");
//                     img.src=object[key][k][i];
//                     tr.insertCell(index).appendChild(img);
//                     index++;
//                 }
//             }
//             else{
//             tr.insertCell(index).innerHTML = obj[k];
//             index++;
//             }                   
//         }
//     })
// }

function selectProd(obj){
    var checkbox = document.getElementById(obj.id);
    if(checkbox.checked){
        obj.selected=true;
        console.log(checkbox.checked);
    }
    else{
        obj.selected=false;
        console.log(checkbox.checked);
    }
    return obj;
}

function deleteitems(){
    adminoperations.deleteProduct();
    printAll();
    
}

function searchById(){
    var id = document.querySelector("#search").value;
    var pr = adminoperations.searchById(id);
    
    if(id==null||id==undefined){
        printAll();
    }

    var tbody = document.querySelector("#productlist");
    tbody.innerHTML="";
    pr.then(object=>{
        var tr = tbody.insertRow();
        var index=0;

        var checkbox = document.createElement("input");
        checkbox.type="checkbox";
        tr.insertCell(index).appendChild(checkbox);
        checkbox.addEventListener("click",()=>{
            var obj = selectProd(object);
            // console.log(obj);
            if(obj.selected){
                adminoperations.markedlist.push(obj);
                // console.log(adminoperations.markedlist);
            }
            else if(!obj.selected){
                adminoperations.markedlist=adminoperations.markedlist.filter(object=>{
                    if(object.id!=obj.id){
                        return object;
                    }
                })
            }
        })
        index++;
        for(let key in object){
            console.log(object[key]);
        
            if(key=="isFreshArrival" || key=="isTopSeller" || key=="outOfStock" || key=="selected"){
                continue;
            }
            if(key=="imgarray"){
                for(let i in object[key]){
                    var img = document.createElement("img");
                    img.src=object[key][i];
                    tr.insertCell(index).appendChild(img);
                    index++;
                }
            }
            else{
                tr.insertCell(index).innerHTML = object[key];
                index++;
            }
        }
    }).catch(err=>console.log("error is "+err));
}
