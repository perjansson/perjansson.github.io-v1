setTimeout(function() {
    function isSmallScreen() {
        return window.matchMedia('(max-width: 480px)').matches;
    }

    const factor = isSmallScreen() ? 0.8 : 0.85;
    document.querySelector('.me').style.height =
        window.innerHeight * factor + 'px';
}, 500);

document.querySelector(
    '.me .me__contact'
).innerHTML = content.me.contacts.reduce(function(memo, contact, i) {
    var isLast = i === content.me.contacts.length - 1;

    return (
        memo +
        "<a target='_blank' rel='noopener noreferrer' href='" +
        contact.url +
        "'>" +
        contact.medium +
        '</a>' +
        (!isLast ? ', ' : '')
    );
}, '');
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

setTimeout(function() {
    sr.reveal('.me__header', {
        distance: '150%',
        origin: 'top',
        duration: 1000
    });

    sr.reveal('.me__description', {
        scale: 0.9,
        duration: 1000,
        delay: 1000
    });

    sr.reveal('.me__contact', {
        distance: '20%',
        origin: 'left',
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
        duration: 1000
    });
}, 500);

var projectsHeader = document.querySelector('.projects .projects__header');

document
    .querySelector('.projects .projects__header')
    .addEventListener('click', function() {
        zenscroll.to(projectsHeader);
    });

var meContent = document.querySelector('.me__content');

document.querySelector('.me .me__more').addEventListener('click', function() {
    var toLong = !meContent.classList.contains('long');

    meContent.classList.add('flip');
    meContent.style.opacity = 0;

    setTimeout(function() {
        document.querySelector('.me .me__description').innerHTML = toLong
            ? content.me.long
            : content.me.short;

        if (toLong) {
            meContent.classList.add('long');
        } else {
            meContent.classList.remove('long');
        }
    }, 500);

    setTimeout(function() {
        meContent.style.opacity = 1;
    }, 600);

    setTimeout(function() {
        meContent.classList.remove('flip');
    }, 1000);
});
