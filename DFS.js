const fs = require("fs").promises;
const path = require("path");
const log = console.log;
const write = process.stdout.write.bind(process.stdout);
let visit = [];
let trace = [];
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
        trace[i] = -1;
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
    for (let v = 0; v < n; v++) {
        if (visit[v] && matrix[u][v]) {
            trace[v] = u;
            DFS(v, n);
        }
    }
}

function DFSNotUseVisit(u, n) {
    log(u + 1, ",");
    for (let v = 0; v < n; v++) {
        if (trace[v] === -1 && matrix[u][v]) {
            trace[v] = u;
            DFS(v, n);
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

function isNumeric(num) {
    return !isNaN(num);
}

const mainProgram = async () => {
    let lines = await readFile();
    let [n, start, finish] = lines[0].split(" ").map((item) => {
        return Number(item);
    });
    initMatrix(n);
    inputMatrix(n, lines);
    DFS(--start, n);
    // DFSNotUseVisit(start, n);
    printOutput(start, --finish);
    // printGraph(n);
};

mainProgram();
