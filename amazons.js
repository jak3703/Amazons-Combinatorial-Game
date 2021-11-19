
// # '' = empty
// # 'b' = black piece
// # 'w' = white piece
// # 'x' = destroyed
const grid = []

// # b = black, w = white
// # p = select initial position, m = moving piece, s = piece is shooting
let state = ''
let whitePos = []
let blackPos = []

function checkSpaceIsDiagonal(startRow, startCol, endRow, endCol) {
    const maxRow = grid.length
    const maxCol = grid[0].length
    for (let deltaR = -1; deltaR <= 1; deltaR += 2) {
        for (let deltaC = -1; deltaC <= 1; deltaC += 2) {
            let curRow = startRow + deltaR
            let curCol = startCol + deltaC
            while (curRow < maxRow && curRow >= 0 && curCol < maxCol && curCol >= 0) {
                if (grid[curRow][curCol] === 'w' || grid[curRow][curCol] === 'b' || grid[curRow][curCol] === 'x') {
                    break
                }
                if (curRow === endRow && curCol === endCol) {
                    return true
                }
                curRow += deltaR
                curCol += deltaC
            }
        }
    }
    return false
}

function initGame(rows, cols) {
    for (let r = 0; r < rows; r++) {
        const row = []
        for (let c = 0; c < cols; c++) {
            row.push('')
        }
        grid.push(row)
    }
    state = 'bp'
}

function getState() {
    return state
}

function getGrid() {
    return grid
}

function initBlack(r, c) {
    grid[r][c] = 'b'
    blackPos = [r, c]
    state = 'wp'
}

function initWhite(r, c) {
    if (grid[r][c] === '') {
        grid[r][c] = 'w'
        whitePos = [r, c]
        state = 'bm'
        return false
    }
    return true
}

function moveBlack(r, c) {
    if (r === blackPos[0] && c === blackPos[1]) {
        return true
    }
    // moving left or right
    if (r === blackPos[0]) {
        const direction = Math.sign(c - blackPos[1])
        for (let i = blackPos[1]; i != c + direction; i += direction) {
            if (grid[r][i] === 'w' || grid[r][i] === 'x') {
                return true
            }
        }
        grid[blackPos[0]][blackPos[1]] = ''
        blackPos[0] = r
        blackPos[1] = c
        grid[r][c] = 'b'
        state = 'bs'
        return false
    } 
    // moving up or down
    else if (c === blackPos[1]) {
        const direction = Math.sign(r - blackPos[0])
        for (let i = blackPos[0]; i != c + direction; i += direction) {
            if (grid[i][c] === 'w' || grid[i][c] === 'x') {
                return true
            }
        }
        grid[blackPos[0]][blackPos[1]] = ''
        blackPos[0] = r
        blackPos[1] = c
        grid[r][c] = 'b'
        state = 'bs'
        return false
    }
    // moving diagonal
    else if (checkSpaceIsDiagonal(blackPos[0], blackPos[1], r, c)) {
        grid[blackPos[0]][blackPos[1]] = ''
        blackPos[0] = r
        blackPos[1] = c
        grid[r][c] = 'b'
        state = 'bs'
        return false
    }
    return true
}

function moveWhite(r, c) {
    if (r === whitePos[0] && c === whitePos[1]) {
        return true
    }
    // moving left or right
    if (r === whitePos[0]) {
        const direction = Math.sign(c - whitePos[1])
        for (let i = whitePos[1]; i != c + direction; i += direction) {
            if (grid[r][i] === 'b' || grid[r][i] === 'x') {
                return true
            }
        }
        grid[whitePos[0]][whitePos[1]] = ''
        whitePos[0] = r
        whitePos[1] = c
        grid[r][c] = 'w'
        state = 'ws'
        return false
    } 
    // moving up or down
    else if (c === whitePos[1]) {
        const direction = -Math.sign(r - whitePos[0])
        for (let i = whitePos[0]; i != c + direction; i += direction) {
            if (grid[i][c] === 'b' || grid[i][c] === 'x') {
                return true
            }
        }
        grid[whitePos[0]][whitePos[1]] = ''
        whitePos[0] = r
        whitePos[1] = c
        grid[r][c] = 'w'
        state = 'ws'
        return false
    }
    // moving diagonal
    else if (checkSpaceIsDiagonal(whitePos[0], whitePos[1], r, c)) {
        grid[whitePos[0]][whitePos[1]] = ''
        whitePos[0] = r
        whitePos[1] = c
        grid[r][c] = 'w'
        state = 'ws'
        return false
    }
    return true
}

function shootBlack(r, c) {
    if (r === blackPos[0] && c === blackPos[1]) {
        return true
    }
    // moving left or right
    if (r === blackPos[0]) {
        const direction = Math.sign(c - blackPos[1])
        for (let i = blackPos[1]; i != c + direction; i += direction) {
            if (grid[r][i] === 'w' || grid[r][i] === 'x') {
                return true
            }
        }
        grid[r][c] = 'x'
        state = 'wm'
        return false
    } 
    // moving up or down
    else if (c === blackPos[1]) {
        const direction = -Math.sign(r - blackPos[0])
        for (let i = blackPos[0]; i != c + direction; i += direction) {
            if (grid[i][c] === 'w' || grid[i][c] === 'x') {
                return true
            }
        }
        grid[r][c] = 'x'
        state = 'wm'
        return false
    }
    // moving diagonal
    else if (checkSpaceIsDiagonal(blackPos[0], blackPos[1], r, c)) {
        grid[r][c] = 'x'
        state = 'wm'
        return false
    }
    return true
}

function shootWhite(r, c) {
    if (r === whitePos[0] && c === whitePos[1]) {
        return true
    }
    // moving left or right
    if (r === whitePos[0]) {
        const direction = Math.sign(c - whitePos[1])
        for (let i = whitePos[1]; i != c + direction; i += direction) {
            if (grid[r][i] === 'b' || grid[r][i] === 'x') {
                return true
            }
        }
        grid[r][c] = 'x'
        state = 'bm'
        return false
    } 
    // moving up or down
    else if (c === whitePos[1]) {
        const direction = -Math.sign(r - whitePos[0])
        for (let i = whitePos[0]; i != c + direction; i += direction) {
            if (grid[i][c] === 'b' || grid[i][c] === 'x') {
                return true
            }
        }
        grid[r][c] = 'x'
        state = 'bm'
        return false
    }
    // moving diagonal
    else if (checkSpaceIsDiagonal(whitePos[0], whitePos[1], r, c)) {
        grid[r][c] = 'x'
        state = 'bm'
        return false
    }
    return true
}