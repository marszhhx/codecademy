const _ = {
    clamp(number, lower, upper) {
        // Solution 1: If else flow    
        // return number <= lower ? lower :
        // number < upper ? number :
        // upper;

        // Solution 2: Math.max() and Math.min()
        const lowerClampedValue = Math.max(lower, number);
        // console.log(lowerClampedValue);
        const clampedValue = Math.min(upper, lowerClampedValue);
        return clampedValue;
    },

    inRange(number, start, end) {
        if (!end) {
            [end, start] = [start, 0];
        }
        if (start > end) {
            [start, end] = [end, start];
        }
        return number < start || number >= end ? false : true;
    },

    words(string) {
        return string.split(' ');
    },

    pad(string, targetLength) {
        if (string.length >= targetLength) {
            return string;
        }
        let headPaddingNum = Math.floor((targetLength - string.length) / 2)
        let tailPaddingNum = targetLength - string.length - headPaddingNum;
        let headPaddingSpace = ' '.repeat(headPaddingNum);
        let tailPaddingSpace = ' '.repeat(tailPaddingNum);
        return headPaddingSpace + string + tailPaddingSpace;
    },

    has(obj, key) {
        // Solution 1: 
        // return obj.hasOwnProperty(key);

        // Solution 2:
        let hasValue = obj[key] === undefined ? false: true;
        return hasValue;
    },

    invert(obj) {
        invertedObj = {};
        // Solution 1 iterate with for of: 
        // for (const [key, value] of Object.entries(obj)) {
        //     invertedObj[value] = key;
        //     console.log(invertedObj)
        // }

        // Solution 2 iterate with forEach() method:
        // Object.entries(obj).forEach(([key, value]) => {
        //     invertedObj[value] = key;
        // console.log(invertedObj);
        // })

        // Solution 3 interate with for in:
        for (const key in obj) {
            invertedObj[obj[key]] = key; 
        }
        return invertedObj;
    },
    findKey(obj, predicateFunc) {
        for (const key in obj) {
            if (predicateFunc(obj[key])) {
                return key;
            } 
        }
        return undefined;
    },
    drop(array, numToDrop) {
        // Solution 1: 
        if (numToDrop) {
            return array.slice(numToDrop);
        }
        return array.slice(1);

        // Solution 2: Brute force
        // let newArray = [];
        // if (numToDrop) {
        //     for (index in array) {
        //         if (index >= numToDrop) {
        //             newArray.push(array[index]);
        //         }
        //     }
        //     return newArray;
        // }
        // array.shift();
        // return array;
    },

    dropWhile(array, predicateFunc) {
        // If predicateFunc value returns false, return the dropNumber;
        let dropNumber = array.findIndex((element, index) => !predicateFunc(element, index, array));
        let droppedArray = this.drop(array, dropNumber);
        return droppedArray;
    },

    chunk(array, size) {
        // Solution 1: Iterate through array from start to finish, jump by size;
        let chunkArray = [];
        // check if size exist.
        console.log(!size)
        if (!size) {
            size = 1;
            
        }
        console.log(array.length, size);
        for (let i = 0; i < array.length; i += size){
            let slicedArray = array.slice(i, i + size);
            chunkArray.push(slicedArray);
        }
        return chunkArray;
    },
}

// Do not write or modify code below this line.
module.exports = _;

let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
_.chunk(array,0);
// let array1 = [1,2,3,4,5];
// let array2 = [6,7,8,9,10];

// let endArray = []
// endArray.unshift(array1);
// endArray.unshift(array2);
// console.log(endArray)