var arr = [];
arr[0] = "{questionRank = 0}";
arr[1] = "{questionRank = 1}";
arr[2] = "{questionRank = 2}";
arr[3] = "{questionRank = 3}";
arr[4] = "{questionRank = 4}";

console.log(arr.join()); // Jani,Hege,Stale,Kai Jim,Borge
arr.splice(2, 0, "Lene");
console.log(arr.join()); // Jani,Hege,Lene,Stale,Kai Jim,Borge
