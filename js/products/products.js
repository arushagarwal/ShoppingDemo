function Product(id,brand,size,color,imgarray,price,isDiscounted,desc,category,discount,isTopSeller,isFreshArrival){
    this.id=id;
    this.brand=brand;
    this.color=color;
    this.size=size;
    this.price=price;
    this.desc=desc;
    this.category=category;
    this.imgarray=imgarray;
    this.isDiscounted=isDiscounted;
    this.discount=discount;

    this.isFreshArrival=isFreshArrival;
    this.isTopSeller=isTopSeller;
    // this.outOfStock=false;

    this.selected=false;
}