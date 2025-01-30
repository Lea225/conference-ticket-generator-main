# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users are able to:

- Complete the form with their details.
- Receive form validation messages if:
  - Any field is missed.
  - The email address is not formatted correctly.
  - The avatar upload is too big or the wrong image format.
- Complete the form only using their keyboard.
- Have inputs, form field hints, and error messages announced on their screen reader.
- See the generated conference ticket when they successfully submit the form.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.

### Screenshot

![Conference Ticket Generator](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Styled Components](https://styled-components.com/) - For styles
- Form validation using vanilla JavaScript
- File upload functionality with image preview

### What I learned

In this project, I focused on several key aspects:

1. **Form Validation**:
   - I implemented client-side form validation to ensure that users are submitting the correct data. This includes checking if the fields are filled, verifying email format, and ensuring the uploaded image is within the correct size and format.
   
   ```js
   function validateEmail(email) {
     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
     return re.test(String(email).toLowerCase());
   }
