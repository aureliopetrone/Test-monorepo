if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (find, replace) {
    let s = '', index, next;
    while (~(next = this.indexOf(find, index))) {
      s += this.substring(index, next) + replace;
      index = next + find.length;
    }
    return s + this.substring(index);
  };
}
