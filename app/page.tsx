'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [num1, setNum1] = useState('0');
  const [num2, setNum2] = useState('0');
  const [result, setResult] = useState(0);

  function add() {
    setResult(parseInt(num1) + parseInt(num2));
  }

  function subtract() {
    setResult(parseInt(num1) - parseInt(num2));
  }

  function multiply() {
    setResult(parseInt(num1) * parseInt(num2));
  }

  function divide() {
    setResult(parseInt(num1) / parseInt(num2));
  }

  return (
    <div className={styles.container}>
      <Link href="/list">virtualized list</Link>
      <div className={styles.result} data-testid="result">
        {result}
      </div>
      <input
        type="number"
        className={styles.input}
        data-testid="num1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        className={styles.input}
        data-testid="num2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={add} className={styles.button} data-testid='add'>
        Add
      </button>
      <button
        onClick={subtract}
        className={styles.button}
        data-testid="subtract"
      >
        Subtract
      </button>
      <button
        onClick={multiply}
        className={styles.button}
        data-testid="multiply"
      >
        Multiply
      </button>
      <button onClick={divide} className={styles.button} data-testid="divide">
        Divide
      </button>
    </div>
  );
}
