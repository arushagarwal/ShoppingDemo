const adminoperations = {
    markedlist : [],

    checkLogin : function(){
       var pr = new Promise((resolve,reject)=>{
        var prodref = firebase.database().ref('admin/login');
            prodref.on("value",snapshot=>{
                console.log("hrlo");
                var object = snapshot.val();
                console.log(object); 
                resolve(object);
            })
       });
       return pr;
    },

    savechanges : function(obj){
        var prodref = firebase.database().ref('admin/login').set(obj);
    },

    addProduct : function(imglist,brand,color,size,price,isdisc,discount,gender,desc,isTopSeller,isFreshArrival){

        var i = localStorage.getItem("counter");
        i++;
        localStorage.setItem("counter",i);

        var product = new Product(i,brand,size,color,imglist,price,isdisc,desc,gender,discount,isTopSeller,isFreshArrival);
        // this.itemlist.push(product);

        var prodref = firebase.database().ref('products/'+i).set(product); 
    },

    editProduct : function(id,imglist,brand,color,size,price,isdisc,discount,gender,desc,isTopSeller,isFreshArrival){
        var product = new Product(id,brand,size,color,imglist,price,isdisc,desc,gender,discount,isTopSeller,isFreshArrival);
        var prodref = firebase.database().ref('products/'+id).set(product); 
    },

    fetchAll : function(){
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products');
            prodref.on("value",snapshot=>{
                var obj = snapshot.val();
                resolve(obj);
                console.log(obj);
            })
        })
        return pr;
    },

    deleteProduct : function(){
        console.log("inside db");
        this.markedlist.forEach(object=>{
            console.log("object to be deleted now is "+object);
            var prodref = firebase.database().ref('products/'+object.id);
            prodref.remove();
        })
        this.markedlist.length=0;
        console.log(this.markedlist);
    },

    fetchCategory : function(search){
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products/');
            prodref.orderByChild(search).equalTo("true").on("value",snapshot=>{
                resolve(snapshot.val());
                console.log(snapshot.val());
            })
          })
          return pr;
    },

    sort : function(search){
        var sortedlist=[];
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products');
            prodref.orderByChild(search).on("value",snapshot=>{
               for(let key in snapshot.val()){
                   sortedlist.push(snapshot.val()[key]);
               }
               console.log(sortedlist);
               sortedlist=sortedlist.sort((a,b)=>a[search]-b[search]);
               sortedlist.forEach(obj=>{
                   console.log(obj[search]);
               })
                resolve(sortedlist);
                console.log(sortedlist);
            })
          })
          return pr;
    },

    searchById : function(id){
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products/'+id);
            prodref.on("value",snapshot=>{
                resolve(snapshot.val());
                console.log(snapshot.val());
            })
          })
          return pr;
    }

}

