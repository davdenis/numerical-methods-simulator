# Numerical Methods Simulator

This project consists in a web tool designed to visualize the execution of classical root-finding algorithms step by step, implementing the Desmos Graphing Calculator API. The app combines numerical computation with interactive graphical visualization, allowing each iteration of the algorithms to be observed directly on the Cartesian plane. It was developed as a study companion for numerical analysis, with a particular focus on understanding the geometric behavior and convergence of the implemented methods.

## Features
- Step-by-step visualization - During execution, each iteration is visually representated on the Cartesian plane for a better understanding.
- Interactive function input - Users can enter and modify mathematical expressions, which are then evaluated and rendered by the integrated graphing calculator.
- Configurable parameters - Each method provides parameters input fields for its initial conditions such as intervals, tolerance and limits, which change accordingly to the selected algoritmh.
- Automated testing - The implemented methods, as the expression parser are covered by unit tests using Vitest.

## Implemented Methods
### Bisection

  #### Parameters
  - **`a`** - Lower endpoint of initial interval.
  - **`b`** - Upper endpoint of initial interval.
  - **`tol`** - Convergence tolerance.
  - **`max`** - Maximum number of iterations allowed.

  This method repeatedly bisects an initial interval $[a, b]$ on which $f(x)$ is continuous and $f(a) \cdot f(b) < 0$, selecting at each step the subinterval where the sign change occurs.

  At each iteration, the midpoint $p_n = \frac{a_n + b_n}{2}$ is calculated, and the subinterval containing the sign change is retained as the input for the next setp. The estimated error is calculated as $E_n = \frac{b_n - a_n}{2}$.

  Then, execution stops as soon as $f(p_n) = 0$ or $E_n \leq \text{tol}$, where $\text{tol}$ is the selected tolerance.


## Requirements
- **`Node.js`**  — Node.js 18 or newer.
- **`npm`** 

A network connection is required for the Desmos API script used by the application.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/davdenis/numerical-methods-simulator.git  
cd numerical-methods-simulator
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite, normally.

