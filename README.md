<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/SathishAdithiyaaSV/Quiz-Website">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Quizzy</h3>

  <p align="center">
    Quizzy is a real-time, multiplayer quiz platform. Users can create and join quiz rooms, compete in teams, and answer questions against the clock.
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Quizzy is an interactive quiz platform designed for fun and engaging quiz sessions with friends, family, or colleagues. The website allows users to create and join quiz rooms, forming teams to compete against each other in real-time.


### Key Features

- **Room Creation**: Hosts can create quiz rooms, set a timer, determine points awarded after the buzzer is pressed, and manage the flow of the quiz.
- **Teams**: Users can join rooms as part of a team and collaborate to answer questions.
- **Host Control**: The host has full control over starting rounds, displaying questions, and revealing answers.
- **Real-time Interaction**: Using Socket.io, all interactions happen in real-time, ensuring a seamless and interactive experience.
- **Leaderboard**: A dynamic leaderboard tracks team scores and ranks them accordingly.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have the latest version of npm installed
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SathishAdithiyaaSV/Quiz-Website.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install MongoDB : https://www.mongodb.com/docs/manual/installation/

3. Start the backend server
   ```sh
   cd backend
   nodemon server.js
   ```
3. Start the frontend 
   ```sh
   cd frontend
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Quizzy can be used to host engaging quiz sessions for various events, such as:

- **Family Gatherings**: Create a room, invite family members, and compete in a fun quiz session.
- **Educational Purposes**: Teachers can use Quizzy to conduct interactive quizzes in classrooms.
- **Corporate Events**: Use Quizzy for team-building activities during corporate events.

### Example

1. **Login/Signup**
    - Create an account with a username, email and password if not already registered else login with your username and password.

1. **Create a Room**
   - As a host, create a quiz room, create rounds add questions(text/mcq). 
   - You can also set the room settings(points, time, time and points after each buzz etc.) for the entire room or for individual rounds.
   - Share the room link with participants.

2. **Join a Room**
   - Participants join the room by entering the room code or by clicking the room link that is shared.
   - Form teams and get ready for the quiz.
   - Make sure that your teammates have also joined the room by clicking the room link that is shared or by entering the room code.

3. **Start the Quiz**
   - The host starts the quiz, displays questions, and controls the flow of the quiz.
   - Teams can press the buzzer and answer questions in real-time, and points are awarded based on correctness and when the buzzer is pressed.

4. **Leaderboard**
   - After each question, the leaderboard updates to show team rankings.

_For more examples, please refer to the [Documentation](https://example.com)_

Additional screenshots, code examples, and demos will be added here to provide more insights into how Quizzy can be used effectively.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/SathishAdithiyaaSV/Quiz-Website?style=for-the-badge
[contributors-url]: https://github.com/SathishAdithiyaaSV/Quiz-Website/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SathishAdithiyaaSV/Quiz-Website.svg?style=for-the-badge
[forks-url]: https://github.com/SathishAdithiyaaSV/Quiz-Website/network/members
[stars-shield]: https://img.shields.io/github/stars/SathishAdithiyaaSV/Quiz-Website.svg?style=for-the-badge
[stars-url]: https://github.com/SathishAdithiyaaSV/Quiz-Website/stargazers
[issues-shield]: https://img.shields.io/github/issues/SathishAdithiyaaSV/Quiz-Website.svg?style=for-the-badge
[issues-url]: https://github.com/SathishAdithiyaaSV/Quiz-Website/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
