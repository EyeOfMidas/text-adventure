Array.prototype.shuffle = function() {
    //Fisher-Yates
    var index = this.length, swapIndex, swap;
    while(--index > 0){
        swapIndex = Math.floor(Math.random() * (index+1));
        swap = this[swapIndex];
        this[swapIndex] = this[index];
        this[index] = swap;
    }
    return this
}