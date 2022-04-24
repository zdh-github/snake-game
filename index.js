var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-ignore - 检测设备类型
var device = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent || navigator.vendor || window.opera) ? "mobile" : "pc";
var Game = /** @class */ (function () {
    function Game(selector) {
        this.ctx = null;
        this.width = 0;
        this.height = 0;
        this.score = 0;
        var canvas = document.querySelector(selector);
        if (canvas === null || canvas.constructor !== HTMLCanvasElement) {
            console.error(new Error("".concat(selector, " is not a canvas element")));
            return;
        }
        this.width = canvas.width = Math.floor(document.body.offsetWidth / 20);
        this.height = canvas.height = Math.floor(document.body.offsetHeight / 20);
        this.ctx = canvas.getContext("2d");
    }
    return Game;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(selector) {
        var _this = _super.call(this, selector) || this;
        _this.length = 5;
        _this.scenes = [];
        _this.coords = [];
        _this.food = { x: -1, y: -1 };
        _this.extend = false;
        _this.dir = "right";
        return _this;
    }
    Snake.prototype.initScenes = function () {
        this.scenes = [];
        for (var y = 0; y < this.height; y++) {
            this.scenes.push([]);
            for (var x = 0; x < this.width; x++) {
                this.scenes[y].push(0);
            }
        }
    };
    Snake.prototype.drawScenes = function () {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.scenes[y][x] === 1) {
                    this.ctx.fillStyle = "#f00";
                    this.ctx.fillRect(x, y, 1, 1);
                }
                else if (this.scenes[y][x] === 2) {
                    this.ctx.fillStyle = "#0f0";
                    this.ctx.fillRect(x, y, 1, 1);
                }
                else {
                    this.ctx.fillStyle = "#000";
                    this.ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    };
    Snake.prototype.initCoords = function () {
        for (var i = 0; i < this.length; i++) {
            this.coords.push({
                x: i,
                y: 0
            });
        }
    };
    Snake.prototype.injectCoordsInScenes = function () {
        var _loop_1 = function (i) {
            var coord = this_1.coords[i];
            var sameCount = this_1.coords.filter(function (item) {
                return item.x === coord.x && item.y === coord.y;
            }).length;
            if (coord.x === this_1.food.x && coord.y === this_1.food.y) {
                this_1.score += 1;
                this_1.extend = this_1.score % 5 === 0;
                this_1.injectFoodInScenes();
            }
            if (this_1.scenes[coord.y] === undefined || this_1.scenes[coord.y][coord.x] === undefined) {
                return { value: false };
            }
            if (sameCount > 1) {
                return { value: false };
            }
            this_1.scenes[coord.y][coord.x] = 1;
        };
        var this_1 = this;
        for (var i = 0; i < this.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return true;
    };
    Snake.prototype.clearFirstCoordsInScenes = function () {
        var firstCoord = this.coords[0];
        this.coords.splice(0, 1);
        this.scenes[firstCoord.y][firstCoord.x] = 0;
    };
    Snake.prototype.injectFoodInScenes = function () {
        var emptyCoords = [];
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.scenes[y][x] === 0) {
                    emptyCoords.push({ x: x, y: y });
                }
            }
        }
        this.food = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
        this.scenes[this.food.y][this.food.x] = 2;
    };
    Snake.prototype.start = function () {
        this.initScenes();
        this.initCoords();
        this.injectCoordsInScenes();
        this.injectFoodInScenes();
        this.drawScenes();
    };
    Snake.prototype.over = function () {
        this.score = 0;
        this.length = 5;
        this.coords = [];
        this.dir = "right";
        this.start();
    };
    Snake.prototype.move = function () {
        var lastCoord = this.coords[this.coords.length - 1];
        if (this.dir === "right") {
            this.coords.push({ x: lastCoord.x + 1, y: lastCoord.y });
        }
        else if (this.dir === "left") {
            this.coords.push({ x: lastCoord.x - 1, y: lastCoord.y });
        }
        else if (this.dir === "up") {
            this.coords.push({ x: lastCoord.x, y: lastCoord.y - 1 });
        }
        else if (this.dir === "down") {
            this.coords.push({ x: lastCoord.x, y: lastCoord.y + 1 });
        }
        if (this.extend) {
            this.extend = false;
            this.length += 1;
        }
        else {
            this.clearFirstCoordsInScenes();
        }
        var injectSuccess = this.injectCoordsInScenes();
        if (injectSuccess) {
            this.drawScenes();
        }
        else {
            this.over();
        }
    };
    return Snake;
}(Game));
var snake = new Snake("canvas");
// 间隔(数值越小速度越快)
var interval = device === "pc" ? 5 : 10;
var timestamp = 0;
function animation() {
    timestamp += 1;
    if (timestamp > interval) {
        timestamp = 0;
        snake.move();
    }
    requestAnimationFrame(animation);
}
// 触摸手机屏幕的开始点和结束点
var startPoint = { x: 0, y: 0 };
var endPoint = { x: 0, y: 0 };
window.addEventListener("load", function () {
    snake.start();
    animation();
    if (device === "pc") {
        window.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "ArrowUp": /* 上 */
                    if (snake.dir !== "down") {
                        snake.dir = "up";
                        snake.move();
                    }
                    break;
                case "ArrowDown": /* 下 */
                    if (snake.dir !== "up") {
                        snake.dir = "down";
                        snake.move();
                    }
                    break;
                case "ArrowLeft": /* 左 */
                    if (snake.dir !== "right") {
                        snake.dir = "left";
                        snake.move();
                    }
                    break;
                case "ArrowRight": /* 右 */
                    if (snake.dir !== "left") {
                        snake.dir = "right";
                        snake.move();
                    }
                    break;
            }
        });
    }
    else if (device === "mobile") {
        window.addEventListener("touchstart", function (event) {
            startPoint.x = event.touches[0].clientX;
            startPoint.y = event.touches[0].clientY;
        });
        window.addEventListener("touchmove", function (event) {
            endPoint.x = event.touches[0].clientX;
            endPoint.y = event.touches[0].clientY;
        });
        window.addEventListener("touchend", function () {
            var moveX = Math.abs(endPoint.x - startPoint.x);
            var moveY = Math.abs(endPoint.y - startPoint.y);
            if (moveX > moveY) {
                if (endPoint.x > startPoint.x) /* 右 */ {
                    if (snake.dir !== "left") {
                        snake.dir = "right";
                        snake.move();
                    }
                }
                else if (endPoint.x < startPoint.x) /* 左 */ {
                    if (snake.dir !== "right") {
                        snake.dir = "left";
                        snake.move();
                    }
                }
            }
            else if (moveY > moveX) {
                if (endPoint.y > startPoint.y) /* 下 */ {
                    if (snake.dir !== "up") {
                        snake.dir = "down";
                        snake.move();
                    }
                }
                else if (endPoint.y < startPoint.y) /* 上 */ {
                    if (snake.dir !== "down") {
                        snake.dir = "up";
                        snake.move();
                    }
                }
            }
        });
    }
});
