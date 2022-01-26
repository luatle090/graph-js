const fs = require("fs").promises;
const util = require("./Util");
const path = require("path");
const log = console.log;
const write = process.stdout.write.bind(process.stdout);
let visit = [];
let trace = [];
let stack = [];
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

function DFS(u, n) {
    log(u + 1, ",");
    visit[u] = false;
    stack.push(u);
    while (util.isArrayNotEmpty(stack)) {
        u = stack.pop();
        for (let v = 0; v < n; v++) {
            if (visit[v] && matrix[u][v]) {
                trace[v] = u;
                visit[v] = false;
                stack.push(u);
                stack.push(v);
                break;
            }
        }
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
        write("path from ", start, " to ", finish, " not found!");
    } else {
        while (start != finish) {
            write(finish + "<-");
            finish = trace[finish];
        }
        write(start.toString());
    }
};

const mainProgram = async () => {
    let lines = await readFile();
    let [n, start, finish] = lines[0].split(" ").map((item) => {
        return Number(item);
    });
    initMatrix(n);
    inputMatrix(n, lines);
    DFS(--start, n);
    printOutput(start, --finish);
    // printGraph(n);
};

mainProgram();
