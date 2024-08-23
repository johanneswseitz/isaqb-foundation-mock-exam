# iSAQB CPSA-F Mock Exam


This project implements an interactive version of the [official iSAQB Foundation Level mock exam](https://github.com/isaqb-org/examination-foundation/).


## Take the mock exam

https://johanneswseitz.github.io/isaqb-foundation-mock-exam/

## Features

* Stand-alone webpage without a server-side component (can thus be hosted/used on GitHub pages)
* Implements official scoring rules from iSAQB (includes A Questions, P Questions, K Questions)
* I18n built-in. Questions available in English and German.

## Feature Wishes

* Dashboard for trainers running a mock exam session.

## Scraping questions from the iSAQB repo

There's a python script for scraping questions from the mock exam asciidoc located in the `scripts` folder. To scrape the questions, clone the [iSAQB repo](https://github.com/isaqb-org/examination-foundation/) into the `scripts` folder and run `pipenv run python3 create_questions_json_from_mock_exam_asciidoc.py`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


TODO: 
* Typing überprüfen
* Rundungsfehler?
* what happened to question 1?