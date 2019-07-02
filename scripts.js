var content = {
    me: {
        name: 'Per Jansson',
        title: 'Fullstack Web Developer',
        short:
            "Hi I'm Per, a curious software developer with a passion to build great stuff and help others do the same.",
        long:
            'My core skills are in fullstack web development and, although I’m no stranger to backend, I’ve always been drawn to the frontend side. I like the things that are visual and that a user interacts with and I have many years of experience in how to build systems and applications that are a good mix of quality, robustness and ease of use. I really enjoy working with Node, React and JavaScript in general, but I also have done a lot of Java previously together with both Android och iOS development. I addition to that I also like the architectural part of how a solid frontend is created together with making the Developer Experience really good for the current team so it’s a joy to work with.'
    },
    projects: [
        {
            title: 'HBO GO app',
            description:
                'HBO GO client in US for TV platforms: Samsung Orsay, TiVo set-top box and Hotels (LG and Enseo devices). A web application using HTML, CSS, and TypeScript. Frameworks and libraries used are React, Redux, Styled Components and Ramda. It is built using Grunt and Browserify.',
            me:
                'Software developer of the HBO GO app for different platforms and devices. Daily work consists of both developing new features in a shiny new codebase but also maintaining and solving tricky problems in a legacy codebase. Fun and challenging!',
            tags: [
                'typescript',
                'react',
                'redux',
                'styled-components',
                'storybook',
                'jest',
                'enzyme',
                'node',
                'npm',
                'git',
                'vs code'
            ]
        },
        {
            title: 'Unibet Frontend for Kindred Group',
            description:
                'Several different betting websites built using web technologies and using configuration of a headless CMS to create the final experience for the client.',
            me:
                'Frontend developer in a team responsible for Unibet, Storspelare, Bingo.com and Bohemia Casino. Development of mostly new features build with the latest technologies but also maintaining legacy code. Trying daily to contribute to team becoming more efficient both in programming but also in team work and good development practices.',
            tags: [
                'javascript',
                'react',
                'redux',
                'reselect',
                'styled-components',
                'jest',
                'enzyme',
                'storybook',
                'storyshots',
                'webpack',
                'babel',
                'html',
                'sass',
                'node',
                'yarn',
                'cypress',
                'codemods',
                'jscodeshift',
                'git',
                'vs code'
            ]
        },
        {
            title: 'New Admin web for Leadenhancer',
            description:
                'Web application for the back office users to configure different tracking setups for difference clients.',
            me:
                'Frontend developer building the new admin web to support the needs of the admin users of Leadenhancer. Performed a technical migration of the project including the build system (switching Gulp to Webpack and as well as from Bower to NPM), code quality (switching jshint to ESLint and added Prettier for format rules) and javascript (migrated AngularJS from ES5 to ES2015 and beyond). Complete restyling of the application to a more modern look and feel.',
            tags: [
                'javascript',
                'angular',
                'node',
                'npm',
                'sass',
                'eslint',
                'prettier',
                'webpack'
            ]
        },
        {
            title: 'Insourcing Matchmaking Tool for EY',
            description:
                'A web application that act as a matchmaking tool to find the best candidate of insourced consultants and employees for a given client and project. Also a back-office module for administrators and consultants to manage their skills, CVs, personal video, details etc.',
            me:
                "Responsible for building the full experience, ie. the client, a responsive web app that's both fast and intuitive to use, and the server with business logic, a nodejs app with mongodb as persistence.",
            tags: [
                'javascript',
                'angular',
                'ngxs',
                'react',
                'graphql',
                'apollo',
                'sass',
                'animate.css',
                'express',
                'jwt',
                'passport',
                'lodash',
                'node',
                'npm',
                'webpack',
                'typescript',
                'mongodb',
                'heroku',
                'aws s3',
                'mlab',
                'papertrail',
                'pushover'
            ]
        },
        {
            title: '',
            description: '',
            me: '',
            tags: ''
        },
        {
            title: '',
            description: '',
            me: '',
            tags: ''
        },
        {
            title: '',
            description: '',
            me: '',
            tags: ''
        }
    ]
};

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.querySelector('.me .me__description').innerHTML = content.me.short;
document.querySelector('.me .me__name').innerHTML = content.me.name;
document.querySelector('.me .me__title').innerHTML = content.me.title;

var createProjectDiv = function(project, prop, prefix) {
    var div = document.createElement('div');

    div.className = 'project__' + prop;
    var value = project[prop];

    if (Array.isArray(value)) {
        value.forEach(function(v) {
            var span = document.createElement('span');

            span.innerHTML = v;
            div.appendChild(span);
        });
    } else {
        div.innerHTML = prefix
            ? '<span class="project__prefix">' +
              prefix +
              '</span>' +
              ': ' +
              value
            : value;
    }
    return div;
};

content.projects
    .filter(function(project) {
        return !!project.title;
    })
    .forEach(function(project) {
        var li = document.createElement('li');

        li.className = 'project';
        document.querySelector('.projects .projects__list').appendChild(li);

        li.appendChild(createProjectDiv(project, 'title'));
        li.appendChild(createProjectDiv(project, 'description', 'Desc'));
        li.appendChild(createProjectDiv(project, 'me', 'Me'));
        li.appendChild(createProjectDiv(project, 'tags'));
    });

window.sr = ScrollReveal({ reset: true });

sr.reveal('.me__header', {
    distance: '150%',
    origin: 'top',
    duration: 1000,
    delay: 500
});

sr.reveal('.me__description', {
    scale: 0.9,
    duration: 1000,
    delay: 1500
});

sr.reveal('.me__more', {
    distance: '100%',
    origin: 'left',
    duration: 1000,
    delay: 2500
});

sr.reveal('.projects');

sr.reveal('.projects__header', {
    scale: 0.9,
    duration: 1000,
    delay: 2500
});

sr.reveal('.project', {
    distance: '25%',
    origin: 'bottom',
    scale: 0.8,
    duration: 1000,
    delay: 500
});

var projectsHeader = document.querySelector('.projects .projects__header');

document
    .querySelector('.projects .projects__header')
    .addEventListener('click', function() {
        zenscroll.to(projectsHeader);
    });

var meContent = document.querySelector('.me__content');
document.querySelector('.me .me__more').addEventListener('click', function() {
    var toLong = !meContent.classList.contains('long');
    meContent.style.opacity = 0;
    setTimeout(function() {
        document.querySelector('.me .me__description').innerHTML = toLong
            ? content.me.long
            : content.me.short;
    }, 1000);
    setTimeout(function() {
        meContent.style.opacity = 1;
        toLong
            ? meContent.classList.add('long')
            : meContent.classList.remove('long');
    }, 1000);
});
