const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(arr) {
        this.field = arr;
        this.x = 0;
        this.y = 0;
    }

    // print out the field in console
    print() {
        for (let i in this.field) {
            console.log(this.field[i].join(''));
        }
    }

    // return true if game continues, return false if win or lose;
    continueGame() {
        // check if went out of bound
        let fieldWidth = this.field[this.y].length;
        let fieldHeight = this.field.length;
        if (this.x < 0 || this.x >= fieldWidth || this.y < 0 || this.y >= fieldHeight) {
            console.log("YOU LOSE! You went out of bound...");
            return false;
        } else if (this.field[this.y][this.x] === hole) { //
            console.log("YOU LOSE! You falled into the hole...");
            return false;
        } else if (this.field[this.y][this.x] === hat)  {
            console.log("YOU WIN! You found the hat!");
            return false;
        }
        return true;
    }

    // ask user for in put and update the location
    updateLocation() {
        let move = prompt("Which way? (w/s/a/d + Enter):")
        switch (move) {
            case 'w':
                this.y -= 1;
                break;
            case 's':
                this.y += 1;
                break;
            case 'a': 
                this.x -= 1;
                break;
            case 'd':
                this.x += 1;
                break;
            default:
                console.log('Invalid Input: try again')
                break;
        }
    }

    //update
    updateField() {
        this.field[this.y][this.x] = pathCharacter;
    }

    startGame() {
        this.print(); // initial print 
        this.updateLocation(); // prompt input and update location
        while(this.continueGame()) {
            this.updateField(); // update field map
            this.print(); // print field map
            this.updateLocation(); // prompt input and update location
        }
    }

    static generateField(height, width, holePercentage) {
        // verify data;
        if (height < 2 || width < 2) {
            console.log('Invalid Input:  height or width should be at least above 2');
            return;
        } else if (holePercentage < 0 || holePercentage > 100) {
            console.log('Invalid Input:  Percentage should be greater or equal to 0 and less than or equal 100');
            return;
        }

        // helper function to return hole or fieldCharacter depening on percentage.
        const fieldOrHole = () => {
            const randNum = Math.floor(Math.random() * 101);
            if (randNum <= holePercentage) {
                return hole;
            } else {
                return fieldCharacter;
            }
        }

        // helper function to return a plain field with no hat or pathCharactor
        const plainField = () => {
            let constructField = [];

            for (let y = 0; y < height; y++) {
                let rowArr = [];
                for (let x = 0; x < width; x++) {
                    // initialize & push fieldCharacter to the field;
                    // let char = arr[Math.floor(Math.random() * 2)];
                    rowArr.push(fieldOrHole());
                }
                constructField.push(rowArr);
            }
            return constructField;
        }

        // helper function to put player into the field
        const putPlayer = (field) => {
            field[0][0] = pathCharacter;
        }

        // helper function to put hat into the field
        const putHat = (field) => {
            // check if hat sits on top of * and will reposition if so
            let hatX, hatY;
            do {
                hatX = Math.floor(Math.random() * width);
                hatY = Math.floor(Math.random() * height);
            } while (hatX === 0 && hatY === 0);
            field[hatY][hatX] = hat;
        }

        const gameField = plainField();
        putPlayer(gameField);
        putHat(gameField);
        return gameField;
    }
}

let field = Field.generateField(9, 9, 5);
const myField = new Field(field);
myField.startGame();
