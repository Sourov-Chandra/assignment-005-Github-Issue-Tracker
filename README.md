# 1️⃣ What is the difference between var, let, and const?

## Answer: 
### 'var': var is the old way of declaring variables. it is function scoped(not blocking scoped), can be re-declared, can be reassinged and gets hoisted and initialized with undefined.

### 'let': let was introduced in ES6. It is block scoped, cannot be re-declared in the same scope, can be reassigned and hoisted but not initialized.

### 'const': const is a also introduced in ES6 and is used for constant variables. It is block scoped, cannot be re-declared and reassigned and must be initialized when declared.

<br><br>

# 2️⃣ What is the spread operator (...)?

## Answer: 
### The spread operator (...) is a powerful syntax introduced in ES6 that allows an iterable (like an array or an object) to be expanded into individual elements.

<br><br>

# 3️⃣ What is the difference between map(), filter(), and forEach()?

## Answer: 
### 'map()': Use map() when you want to transform every element in an array and get a new array of the same length back. It does not change the original array.
### 'filter()': Use filter() when you want to select specific elements based on a condition. Like map(), it returns a new array, but it may be shorter than the original.
### 'forEach()': Use forEach() when you want to do something with every element, but you don't need a new array back.




<br><br>

# 4️⃣ What is an arrow function?

## Answer: 
### An arrow function is a more concise way to write function expressions in JavaScript, introduced in ES6. It uses the "fat arrow" (=>) syntax and behaves slightly differently than traditional functions.

<br><br>

# 5️⃣ What are template literals?

## Answer: 
### Template literals are a modern way to work with strings in JavaScript, introduced in ES6. Instead of using single quotes (') or double quotes ("), they use backticks (`). <br> They make your code much cleaner, especially when you need to include variables or create strings that span multiple lines.