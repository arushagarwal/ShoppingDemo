const useroperations = {

    cart : [],
    categorylist:[],

    getAll : function(){
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products/');
            prodref.on("value",snapshot=>{
                resolve(snapshot.val());
            })
        })
        return pr;
    },

    getanycategory : function(search,value){
        console.log("search is "+search+" value is "+value);
        console.log("inside dbopr");
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products/');
            prodref.orderByChild(search).equalTo(value).on("value",snapshot=>{
                var obj = snapshot.val();
                
                for(let key in obj){
                    this.categorylist.push(obj[key]);
                }
                // console.log(this.categorylist);
                resolve(obj);
                // console.log(snapshot.val());
            })
          })
          return pr;
    },

    searchById : function(id){
        var pr = new Promise((resolve,reject)=>{
            var prodref = firebase.database().ref('products/'+id);
            prodref.on("value",snapshot=>{
            var object = snapshot.val();
            resolve(object);
            })
        })
        return pr;
    },

    
}