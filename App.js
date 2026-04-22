import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const winner = calculateWinner(board);
  const status = gameOver
    ? winner
      ? `Winner: ${winner}`
      : 'Draw!'
    : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const handlePress = (index) => {
    if (board[index] || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner || !newBoard.includes(null)) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={[
        styles.square,
        board[index] === 'X' && styles.squareX,
        board[index] === 'O' && styles.squareO,
      ]}
      onPress={() => handlePress(index)}
      activeOpacity={0.7}
    >
      <Text style={[styles.squareText, board[index] === 'X' ? styles.textX : styles.textO]}>
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={[styles.status, gameOver && styles.statusGameOver]}>{status}</Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#eee',
    marginBottom: 20,
    letterSpacing: 2,
  },
  status: {
    fontSize: 24,
    color: '#0f3',
    marginBottom: 30,
    fontWeight: '600',
  },
  statusGameOver: {
    color: '#ff6b6b',
    fontSize: 28,
  },
  board: {
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#16213e',
    borderWidth: 3,
    borderColor: '#0f3460',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 12,
  },
  squareX: {
    backgroundColor: '#2a2d5a',
  },
  squareO: {
    backgroundColor: '#3a2d4a',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  textX: {
    color: '#00d4ff',
  },
  textO: {
    color: '#ff006e',
  },
  resetButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#eee',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
