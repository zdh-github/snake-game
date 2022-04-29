(function (global) {
    // 场景
    class Scene {
        public device: string = "";
        public canvas: HTMLCanvasElement | null = null;
        protected core: CanvasRenderingContext2D | null = null;
        protected width: number = 0;
        protected height: number = 0;
        constructor(selector: string) {
            let canvas: HTMLCanvasElement | null = document.querySelector(selector);
            if (canvas && canvas.constructor === HTMLCanvasElement) {
                this.width = canvas.width = document.body.offsetWidth;
                this.height = canvas.height = document.body.offsetHeight;
                this.canvas = canvas;
                this.core = canvas.getContext("2d");
                // @ts-ignore
                this.device = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent || navigator.vendor || global.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent || navigator.vendor || global.opera) ? "mobile" : "pc";
            } else {
                console.error(new Error(`${selector} is not a canvas element`));
            }
        }
    }

    // Define Coord Interface - 定义坐标接口
    interface Coord {
        x: number;
        y: number;
    }

    // 贪吃蛇游戏
    class SnakeGame extends Scene {
        private matrix: Array<Array<number>> = [];
        private matrixScale: number = 20;
        private matrixColor: string = "#000";
        private foodColor: string = "#0f0";
        private foodCoord: Coord = { x: -1, y: -1 };
        private playerColor: string = "#f00";
        private playerScore: number = 0;
        private playerLength: number = 5;
        private playerCoords: Array<Coord> = [];
        public playerDir: string = "right";
        private createMatrix() {
            this.matrix = [];
            for (let y = 0; y < this.height; y++) {
                this.matrix.push([]);
                for (let x = 0; x < this.width; x++) {
                    this.matrix[y].push(0);
                }
            }
        }
        private drawMatrix() {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let val: number = this.matrix[y][x];
                    if (val === 1) {
                        this.core.fillStyle = this.playerColor;
                        this.core.fillRect(x, y, 1, 1);
                    } else if (val === 2) {
                        this.core.fillStyle = this.foodColor;
                        this.core.fillRect(x, y, 1, 1);
                    } else {
                        this.core.fillStyle = this.matrixColor;
                        this.core.fillRect(x, y, 1, 1);
                    }
                }
            }
        }
        private createPlayerCoords() {
            for (let i = 0; i < this.playerLength; i++) {
                this.playerCoords.push({
                    x: i,
                    y: 0
                });
            }
        }
        private writePlayerCoords() {
            for (let i = 0; i < this.playerLength; i++) {
                let playerCoord: Coord = this.playerCoords[i];
                this.matrix[playerCoord.y][playerCoord.x] = 1;
            }
        }
        private clearPlayerCoord(index: number) {
            let playerCoord: Coord = this.playerCoords[index];
            this.playerCoords.splice(index, 1);
            this.matrix[playerCoord.y][playerCoord.x] = 0;
        }
        private writeFoodCoord() {
            let emptyCoords: Array<Coord> = [];
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.matrix[y][x] === 0) {
                        emptyCoords.push({ x, y });
                    }
                }
            }
            this.foodCoord = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
            this.matrix[this.foodCoord.y][this.foodCoord.x] = 2;
        }
        public updatePlayerCoords() {
            if (this.canvas) {
                let lastPlayerCoord: Coord = this.playerCoords[this.playerCoords.length - 1];
                if (this.playerDir === "right") {
                    this.playerCoords.push({ x: lastPlayerCoord.x + 1, y: lastPlayerCoord.y });
                } else if (this.playerDir === "left") {
                    this.playerCoords.push({ x: lastPlayerCoord.x - 1, y: lastPlayerCoord.y });
                } else if (this.playerDir === "up") {
                    this.playerCoords.push({ x: lastPlayerCoord.x, y: lastPlayerCoord.y - 1 });
                } else if (this.playerDir === "down") {
                    this.playerCoords.push({ x: lastPlayerCoord.x, y: lastPlayerCoord.y + 1 });
                }
                if (this.checkPlayerGameover()) /* 检查游戏是否结束 */ {
                    this.reset();
                } else {
                    this.checkPlayerEatFood();
                    this.writePlayerCoords();
                    this.drawMatrix();
                }
            }
        }
        private checkPlayerGameover() {
            let lastPlayerCoord: Coord = this.playerCoords[this.playerCoords.length - 1];
            if (this.matrix[lastPlayerCoord.y] === undefined || this.matrix[lastPlayerCoord.y][lastPlayerCoord.x] === undefined) {
                return true;
            }
            let playerCoordsJSON: Array<string> = this.playerCoords.map((item: Coord, index: number) => {
                return JSON.stringify(item);
            });
            let playerCoordsSet: Set<string> = new Set(playerCoordsJSON);
            if (playerCoordsSet.size < this.playerCoords.length) {
                return true;
            }
            return false;
        }
        private checkPlayerEatFood() {
            let lastPlayerCoord: Coord = this.playerCoords[this.playerCoords.length - 1];
            if (lastPlayerCoord.x === this.foodCoord.x && lastPlayerCoord.y === this.foodCoord.y) {
                this.playerScore += 1;
                if (this.playerScore % 5 === 0) {
                    this.playerLength += 1;
                } else {
                    this.clearPlayerCoord(0);
                }
                this.writeFoodCoord();
            } else {
                this.clearPlayerCoord(0);
            }
        }
        private reset() {
            this.playerScore = 0;
            this.playerLength = 5;
            this.playerCoords = [];
            this.playerDir = "right";
            this.start();
        }
        private start() {
            this.createMatrix();
            this.createPlayerCoords();
            this.writePlayerCoords();
            this.writeFoodCoord();
            this.drawMatrix();
        }
        constructor(selector: string) {
            super(selector);
            if (this.canvas) {
                this.width = this.canvas.width = Math.floor(document.body.offsetWidth / this.matrixScale);
                this.height = this.canvas.height = Math.floor(document.body.offsetHeight / this.matrixScale);
                this.start();
            }
        }
    }

    const snakeGame = new SnakeGame("canvas");

    // 间隔(数值越小速度越快)
    let interval: number = snakeGame.device === "pc" ? 5 : 10;
    let timestamp: number = 0;
    // 动画
    function animation() {
        timestamp += 1;
        if (timestamp > interval) {
            timestamp = 0;
            snakeGame.updatePlayerCoords();
        }
        requestAnimationFrame(animation);
    }

    // 触摸手机屏幕的开始点和结束点
    let startPoint: Coord = { x: 0, y: 0 };
    let endPoint: Coord = { x: 0, y: 0 };
    global.addEventListener("load", function () {
        snakeGame.canvas && animation();
        if (snakeGame.device === "pc") /* 监听按下键盘事件 */ {
            global.addEventListener("keydown", function (event: KeyboardEvent) {
                switch (event.key) {
                    case "ArrowUp": /* 上 */
                        if (snakeGame.playerDir !== "down") {
                            snakeGame.playerDir = "up"
                            snakeGame.updatePlayerCoords();
                        }
                        break;
                    case "ArrowDown": /* 下 */
                        if (snakeGame.playerDir !== "up") {
                            snakeGame.playerDir = "down"
                            snakeGame.updatePlayerCoords();
                        }
                        break;
                    case "ArrowLeft": /* 左 */
                        if (snakeGame.playerDir !== "right") {
                            snakeGame.playerDir = "left"
                            snakeGame.updatePlayerCoords();
                        }
                        break;
                    case "ArrowRight": /* 右 */
                        if (snakeGame.playerDir !== "left") {
                            snakeGame.playerDir = "right"
                            snakeGame.updatePlayerCoords();
                        }
                        break;
                }
            });
        } else if (snakeGame.device === "mobile") /* 监听触摸手机屏幕事件 */ {
            global.addEventListener("touchstart", function (event: TouchEvent) {
                startPoint.x = event.touches[0].clientX;
                startPoint.y = event.touches[0].clientY;
            });
            global.addEventListener("touchmove", function (event: TouchEvent) {
                endPoint.x = event.touches[0].clientX;
                endPoint.y = event.touches[0].clientY;
            });
            global.addEventListener("touchend", function () {
                let moveX: number = Math.abs(endPoint.x - startPoint.x);
                let moveY: number = Math.abs(endPoint.y - startPoint.y);
                if (moveX > moveY) {
                    if (endPoint.x > startPoint.x) /* 右 */ {
                        if (snakeGame.playerDir !== "left") {
                            snakeGame.playerDir = "right"
                            snakeGame.updatePlayerCoords();
                        }
                    } else if (endPoint.x < startPoint.x) /* 左 */ {
                        if (snakeGame.playerDir !== "right") {
                            snakeGame.playerDir = "left"
                            snakeGame.updatePlayerCoords();
                        }
                    }
                } else if (moveY > moveX) {
                    if (endPoint.y > startPoint.y) /* 下 */ {
                        if (snakeGame.playerDir !== "up") {
                            snakeGame.playerDir = "down"
                            snakeGame.updatePlayerCoords();
                        }
                    } else if (endPoint.y < startPoint.y) /* 上 */ {
                        if (snakeGame.playerDir !== "down") {
                            snakeGame.playerDir = "up"
                            snakeGame.updatePlayerCoords();
                        }
                    }
                }
            });
        }
    });
})(globalThis)
