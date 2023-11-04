# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)


## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Links

- Solution URL: [github](https://github.com/johnEdmon44/multipage-form)
- Live Site URL: [live](https://johnedmon44.github.io/multipage-form/)

## My process

### Built with

- HTML
- CSS
- Javascript
- [React](https://reactjs.org/) - JS library


### What I Learned

In this project, I gained hands-on experience with building a multi-step form for a subscription service. The application is designed to guide users through the process of selecting a subscription plan, adding optional add-ons, and confirming their subscription. Here's what I learned during this project:

- **React State Management**: I used the `useState` hook in React to manage the state of various components in the application, such as user input, selected subscription plan, add-ons, and step tracking.

- **Form Validation**: I implemented basic form validation by checking for required fields and displaying error messages if users leave essential information blank. This helps ensure that users provide accurate information.

- **Conditional Rendering**: I utilized conditional rendering to display specific form sections based on the user's progress through the multi-step form. This makes the user interface more intuitive and responsive.

- **Event Handling**: I handled events like switching between monthly and yearly billing options, toggling the selected plan, handling checkbox changes for add-ons, and navigating between different form sections.

- **Summary Step**: I created a summary step in the multi-step form, allowing users to review their selections before confirming their subscription. This step displays the selected plan, add-ons, and the total subscription price based on user choices. Users can also go back to previous steps to make adjustments.

- **User Experience Design**: I paid attention to the user experience, providing a clear visual indication of the current step and using intuitive icons and buttons to guide users through the subscription process.

This project gave me valuable insights into building interactive web forms, handling user input, and providing an engaging user experience in React. It's a great foundation for creating similar subscription or registration processes in web applications.