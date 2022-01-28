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
            path.join(__dirname, "../", "input.txt"),
            "utf8"
        );
        return data.split("\r\n");
    } catch (err) {
        console.error(err);
    }
}

function DFS(u, n) {
    write((u + 1).toString() + ",");
    visit[u] = false;
    for (let v = 0; v < n; v++) {
        if (visit[v] && matrix[u][v]) {
            trace[v] = u;
            DFS(v, n);
        }
    }
}

const allConnectedComponent = (n) => {
    let count = 0;
    for (let u = 0; u < n; u++) {
        if (visit[u]) {
            count++;
            write("Thành phần liên thông thứ " + count + " gồm các đỉnh: ");
            write("\n");
            DFS(u, n);
            write("\n\n");
        }
    }
};

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

const mainProgram = async () => {
    let lines = await readFile();
    let [n, start, finish] = lines[0].split(" ").map((item) => {
        return Number(item);
    });
    initMatrix(n);
    inputMatrix(n, lines);
    allConnectedComponent(n);
    // printGraph(n);
};

mainProgram();
