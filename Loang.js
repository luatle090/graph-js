const fs = require("fs").promises;
const util = require("./Util");
const path = require("path");
const log = console.log;
const write = process.stdout.write.bind(process.stdout);
let oldVisit = [];
let newVisit = [];
let trace = [];
let visit = [];
let MAX = 20;
let matrix = new Array(MAX);

// class Graph {
//     constructor(n, matrix) {
//         this.n = n;
//         this.matrix = matrix;
//     }
// }

const initMatrix = (n) => {
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = [];
    }

    for (let i = 0; i < n; i++) {
        visit[i] = true;
    }
};

async function readFile() {
    try {
        const data = await fs.readFile(
            path.join(__dirname, "input.txt"),
            "utf8"
        );
        return data.split("\r\n");
    } catch (err) {
        console.error(err);
    }
}

function BFS_ToanLoang(u, n) {
    oldVisit.push(u);
    visit[u] = false;
    while (util.isArrayNotEmpty(oldVisit)) {
        // xét các đỉnh u thuộc tập oldVisit
        for (let i = 0; i < oldVisit.length; i++) {
            u = oldVisit[i];
            newVisit = [];
            log(u + 1, ",");

            // xét các đỉnh kề với u mà chưa thăm
            for (let v = 0; v < n; v++) {
                if (visit[v] && matrix[u][v]) {
                    // đánh dấu là thăm và lưu lại vết
                    // đẩy giá trị mới thăm vào tập mới
                    visit[v] = false;
                    trace[v] = u;
                    newVisit.push(v);
                }
            }
        }

        // gán tập mới vào tập old sau khi đã quét các đỉnh u từ tập old trước
        oldVisit = newVisit.slice();
    }
}

const printGraph = (n) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // matrix type is a boolean
            write(matrix[i][j] + " ");
        }
        log();
    }
};

const inputMatrix = (n, lines) => {
    for (let i = 0; i < n; i++) {
        let j = 0;
        lines[i + 1].split(" ").forEach((num) => {
            matrix[i][j++] = Number(num) === 1 ? true : false;
        });
    }
};

const printOutput = (start, finish) => {
    if (visit[finish]) {
        write("path from " + start + " to " + finish + " not found!");
    } else {
        while (start != finish) {
            write(finish + 1 + "<-");
            finish = trace[finish];
        }
        write((start + 1).toString());
    }
};

const mainProgram = async () => {
    let lines = await readFile();
    let [n, start, finish] = lines[0].split(" ").map((item) => {
        return Number(item);
    });
    initMatrix(n);
    inputMatrix(n, lines);
    BFS_ToanLoang(--start, n);
    printOutput(start, --finish);
    // printGraph(n);
};
mainProgram();
