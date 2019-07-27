
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            remaining: 0,
            callbacks: []
        };
    }
    function check_outros() {
        if (!outros.remaining) {
            run_all(outros.callbacks);
        }
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.callbacks.push(() => {
                outroing.delete(block);
                if (callback) {
                    block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal: not_equal$$1,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    var content = {
        me: {
            name: 'Per Jansson',
            title: 'Fullstack Web Developer',
            contacts: [
                {
                    medium: 'GitHub',
                    url: 'https://github.com/perjansson'
                },
                {
                    medium: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/pichdude'
                },
                {
                    medium: 'Medium',
                    url: 'https://medium.com/@perjansson'
                },
                {
                    medium: 'Stack Overflow',
                    url: 'https://stackoverflow.com/users/274426/per-jansson'
                },
                {
                    medium: 'Twitter',
                    url: 'https://www.twitter.com/per_jansson'
                },
                {
                    medium: 'Instagram',
                    url: 'https://instagram.com/per_jansson'
                },
                {
                    medium: 'Facebook',
                    url: 'https://www.facebook.com/pichdude'
                },
                {
                    medium: 'Email',
                    url: 'mailto:per.r.jansson@gmail.com'
                }
            ],
            short:
                "Hi I'm Per, a <strong>curious</strong> software developer with a passion to <strong>build great stuff</strong> and help others do the same.",
            long:
                'My core skills are in fullstack <strong>web development</strong> and, although I’m no stranger to backend, I’ve always been drawn to the <strong>frontend</strong> side. I like the things that are visual and that a user interacts with and I have many years of experience in how to build systems and applications that are a good mix of <strong>quality, robustness and ease of use</strong>. I really enjoy working with <strong>Node, React and JavaScript</strong> in general, but I also have done a lot of Java previously together with both Android och iOS development. I addition to that I also like the architectural part of how a solid frontend is created together with making the <strong>Developer Experience</strong> really good for the current team so it’s a joy to work with.'
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
                    'jenkins',
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
                    'jenkins',
                    'vs code'
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
                title: 'New Admin web for Leadenhancer',
                description:
                    'Web application for back office of company that bridges the gap between known and anonymous web visitors by identifying and segmenting the companies visiting a website, and providing detailed, targetable business attributes in real-time.',
                me:
                    'Frontend responsible to build a new admin web to support the needs of the admin users of Leadenhancer. Involves everything from architecture and build and deploy pipeline, REST api design to coding the bits and pieces that are a modern web application.',
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
                title: 'Digitalization and Advisory Cockpit Tool for Nordea Bank',
                description:
                    "Advisory Cockpit Tool to be used by advisors and help digitize an advisor's everyday. The bar was set very high and the application should not only contain a lot of functionality to simplify the days of an advisor, but the end result will also be a great user experience.",
                me:
                    'Development and architecture of the frontend and BFF part of the application. Setting up fast and solid development experience and in general building the foundation of an easy to develop and maintain system. Daily work with building pages and components together with API design.',
                tags: [
                    'javascript',
                    'react',
                    'redux',
                    'reselect',
                    'express',
                    'node',
                    'npm',
                    'webpack',
                    'babel',
                    'lodash',
                    'html',
                    'material-ui',
                    'sass',
                    'css modules',
                    'standardjs',
                    'mocha',
                    'chai',
                    'sinon',
                    'enzyme',
                    'faker.js',
                    'moment',
                    'postman',
                    'java',
                    'spring',
                    'jackson',
                    'scrum',
                    'tdd',
                    'jenkins'
                ]
            },
            {
                title: 'Mindmend prototype',
                description:
                    'A prototype for a digital platform for KBT treatment.',
                me:
                    'Developer of a responsive web app, everything from Sketch to running in the cloud.',
                tags: [
                    'javascript',
                    'html',
                    'jquery',
                    'materialize',
                    'sass',
                    'animate.css',
                    'express',
                    'node',
                    'npm',
                    'webpack',
                    'heroku',
                    'agile'
                ]
            },
            {
                title: 'Nordic portfolio system for Nordea Bank',
                description:
                    'A brand new back office solution along with enhancing and introducing an existing portfolio system in the Nordic countries',
                me:
                    'Coding frontend architect developing the frontend tier, setting up fast and solid development practices/processes/style guides and build system together with being a happy team player working very close to the end user to guarantee the best result.',
                tags: [
                    'javascript',
                    'angularjs',
                    'es2015',
                    'node',
                    'npm',
                    'gulp',
                    'bower',
                    'jquery',
                    'underscore',
                    'html',
                    'bootstrap',
                    'sass',
                    'jshint',
                    'csslint',
                    'htmlhint',
                    'karma',
                    'protractor',
                    'mocha',
                    'chai',
                    'sinon',
                    'java',
                    'spring',
                    'hibernate',
                    'dozer',
                    'flying saucer',
                    'intellij',
                    'git',
                    'maven',
                    'jenkins',
                    'sonarqube',
                    'sql server',
                    'tdd',
                    'ddd',
                    'kanban',
                    'xp'
                ]
            },
            {
                title: 'Risk Calculator for Nordea Bank',
                description:
                    "A system for calculating risk and return, both based on a customer's current portfolio but also on a better allocated portfolio that will be recommended to the customer.",
                me:
                    'Full stack developer of the entire system, although primarily responsible for frontend and API, together with being a happy team player working very close to the end user to guarantee the best result.',
                tags: [
                    'angularjs',
                    'html',
                    'css',
                    'boostrap',
                    'karma',
                    'protractor',
                    'java',
                    'spring',
                    'hibernate',
                    'thymeleaf',
                    'flying Saucer',
                    'jensoft',
                    'dozer',
                    'intellij',
                    'git',
                    'maven',
                    'jenkins',
                    'sonarqube',
                    'sql server',
                    'tdd',
                    'ddd',
                    'scrum',
                    'xp'
                ]
            },
            {
                title: 'Multi portfolio for Nordea Bank',
                description:
                    "Portfolio analysis system extended to support structuring a customer's total engagement in different portfolios to be able to twist and turn the customers current assets.",
                me:
                    'Development and Scrum Master making sure that the team delivers what the end user expects with good code quality.',
                tags: [
                    'gwt',
                    'java',
                    'spring',
                    'hibernate',
                    'apache camel',
                    'dozer',
                    'html',
                    'css',
                    'javascript',
                    'intellij',
                    'svn',
                    'maven',
                    'jenkins',
                    'sonarqube',
                    'sql Server',
                    'tdd',
                    'ddd',
                    'scrum',
                    'xp'
                ]
            },
            {
                title: 'Customized analysis and recommendation for Nordea Bank',
                description:
                    "A system for doing customized analysis, optimization and recommendation of customer's current portfolio to be able to recommend a better portfolio that can give a higher return with a lower risk. <a href='https://medium.com/@perjansson/offshoring-from-the-scream-to-friendship-and-success-5b409c30d287' target='_blank' rel='noopener noreferrer'>Blog post about project on Medium</a>.",
                me:
                    'Development and architecture of the system. Being UX and front end responsible to make the system easy and fast to use. Be proactive in efforts to get a distributed team between Sweden, Denmark and India to work.',
                tags: [
                    'gwt',
                    'java',
                    'spring',
                    'hibernate',
                    'dozer',
                    'html',
                    'css',
                    'javascript',
                    'eclipse',
                    'svn',
                    'maven',
                    'jenkins',
                    'sonarqube',
                    'sql Server',
                    'tdd',
                    'ddd',
                    'scrum',
                    'xp',
                    'lean'
                ]
            },
            {
                title: 'Portfolio for advisors for Nordea Bank',
                description:
                    'A web application for advisors to use when doing analysis of a customers holdings, for instance asset allocation, current and previous holdings, transactions, performance and profit and loss. <a href="https://medium.com/@perjansson/how-we-invented-and-introduced-drama-driven-demo-9cc564bc741f" target="_blank" rel="noopener noreferrer">Blog post about project on Medium</a>.',
                me:
                    'Development and UX making sure the system makes sense and is easy to use, looks nice and is quick and responsive. Advocate efficient software development practices such as pair programming, TDD, code reviews and brown bag lunches.',
                tags: [
                    'gwt',
                    'java',
                    'spring',
                    'hibernate',
                    'dozer',
                    'html',
                    'css',
                    'javascript',
                    'eclipse',
                    'svn',
                    'maven',
                    'jenkins',
                    'sonarqube',
                    'sql Server',
                    'tdd',
                    'ddd',
                    'scrum',
                    'xp',
                    'lean'
                ]
            },
            {
                title: 'App on Android for Swedish Pharmacy',
                description:
                    'An Android app to view the current pollen level at a given location as well as recommended treatments and view closest pharmacy.',
                me:
                    'Develop the Apoteket (swedish pharmacy) application for Android. Took the project from requirements and development to testing and release on Google Play.',
                tags: ['android', 'java', 'android studio', 'scrum']
            },
            {
                title: 'App on Android for Statoil',
                description:
                    'An Android app to view the closest Statoil gas station as well as book trailers, vans etc.',
                me:
                    'Develop the Swedish Statoil application for Android. Took the project from requirements and development to testing and release on Google Play.',
                tags: ['android', 'java', 'android studio', 'scrum']
            },
            {
                title: 'Planning and sorting system for Swedish Postal Service',
                description:
                    'A system to improve the planning and sorting of incoming and outgoing parcels for the Swedish postal service.',
                me:
                    'Development with frontend responsibility to make sure the system was intuitive and easy to use. Held workshops with end users about how the interface should look like.',
                tags: [
                    'jsf',
                    'richfaces',
                    'seam',
                    'html',
                    'css',
                    'javascript',
                    'java ee',
                    'ejb2',
                    'bibernate',
                    'sculptur',
                    'eclipse',
                    'svn',
                    'maven',
                    'hudson',
                    'tdd',
                    'ddd',
                    'rup'
                ]
            },
            {
                title: 'Automatic Payments for Länsförsäkringar Bank',
                description:
                    'Change several existing bank systems to make sure they worked after a backend system for automatic payments was updated.',
                me:
                    'Technical project manager and developer which involved planning and being part of the implementation.',
                tags: [
                    'jsf',
                    'struts',
                    'java',
                    'spring',
                    'hibernate',
                    'eclipse',
                    'svn',
                    'maven',
                    'jenkins',
                    'xp',
                    'scrum'
                ]
            },
            {
                title: 'Proof Of Concept new Internet bank for SEB (Bank)',
                description:
                    'A Proof of concept application to prove that a current internet banking solution could be modified to work for another bank.',
                me:
                    'Developer and development lead to show how we worked with planning, analysis, design, development, test and release.',
                tags: [
                    'jsf',
                    'myfaces',
                    'html',
                    'css',
                    'javascript',
                    'java',
                    'spring',
                    'hibernate',
                    'eclipse',
                    'svn',
                    'maven',
                    'xp',
                    'rup'
                ]
            },
            {
                title: 'New Internet Bank for Länsförsäkringar Bank',
                description:
                    'Build a new shiny internet bank with new technologies, frameworks and most importantly new functionality. ',
                me:
                    'Developer and front end specialist to make sure that the selected technologies played well together when both rebuilding existing functionality but also when adding new.',
                tags: [
                    'jsf',
                    'myfaces',
                    'shale',
                    'html',
                    'css',
                    'javascript',
                    'java',
                    'spring',
                    'hibernate',
                    'eclipse',
                    'svn',
                    'maven',
                    'apache continuum',
                    'xp',
                    'rup'
                ]
            },
            {
                title: 'Change bank application for Länsförsäkringar Bank',
                description:
                    'A system to support bank officers help new customers move all of their existing engagement from other banks to Länsförsäkringar Bank.',
                me: 'Developer with front end responsibility.',
                tags: [
                    'jsf',
                    'myfaces',
                    'shale',
                    'html',
                    'css',
                    'javascript',
                    'java',
                    'spring',
                    'hibernate',
                    'eclipse',
                    'svn',
                    'maven',
                    'apache continuum',
                    'xp',
                    'rup'
                ]
            },
            {
                title:
                    'Bank officers secure communication for Länsförsäkringar Bank',
                description:
                    'a system to enable a secure communication channel between bank officers and bank customers via the internet bank and an internal bank officer application.',
                me: 'Developer with front end responsibility.',
                tags: [
                    'struts',
                    'html',
                    'css',
                    'javascript',
                    'java ee',
                    'ejb 3',
                    'hibernate',
                    'eclipse',
                    'cvs',
                    'ant',
                    'rup'
                ]
            },
            {
                title: 'Internet bank for SEB (Bank) in Germany',
                description: 'A new internet bank for SEB in Germany.',
                me: 'Developer with fullstack responsibility.',
                tags: [
                    'struts',
                    'html',
                    'css',
                    'javascript',
                    'java ee',
                    'ejb 3',
                    'hibernate',
                    'eclipse',
                    'cvs',
                    'ant',
                    'rup'
                ]
            }
        ]
    };

    /* src/components/Tags.svelte generated by Svelte v3.6.4 */

    const file = "src/components/Tags.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.tag = list[i];
    	return child_ctx;
    }

    // (26:2) {#each tags as tag}
    function create_each_block(ctx) {
    	var span, t_value = ctx.tag, t;

    	return {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr(span, "class", "svelte-zxwe2o");
    			add_location(span, file, 26, 4, 365);
    		},

    		m: function mount(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.tags) && t_value !== (t_value = ctx.tag)) {
    				set_data(t, t_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(span);
    			}
    		}
    	};
    }

    function create_fragment(ctx) {
    	var div;

    	var each_value = ctx.tags;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	return {
    		c: function create() {
    			div = element("div");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr(div, "class", "tags svelte-zxwe2o");
    			add_location(div, file, 24, 0, 320);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},

    		p: function update(changed, ctx) {
    			if (changed.tags) {
    				each_value = ctx.tags;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { tags } = $$props;

    	const writable_props = ['tags'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Tags> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('tags' in $$props) $$invalidate('tags', tags = $$props.tags);
    	};

    	return { tags };
    }

    class Tags extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["tags"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.tags === undefined && !('tags' in props)) {
    			console.warn("<Tags> was created without expected prop 'tags'");
    		}
    	}

    	get tags() {
    		throw new Error("<Tags>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tags(value) {
    		throw new Error("<Tags>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Project.svelte generated by Svelte v3.6.4 */

    const file$1 = "src/components/Project.svelte";

    function create_fragment$1(ctx) {
    	var div3, div0, t0, t1, div1, span0, t3, t4, t5, div2, span1, t7, t8, t9, div3_id_value, current;

    	var tags_1 = new Tags({
    		props: { tags: ctx.tags },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text(ctx.title);
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Desc:";
    			t3 = space();
    			t4 = text(ctx.description);
    			t5 = space();
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "Me:";
    			t7 = space();
    			t8 = text(ctx.me);
    			t9 = space();
    			tags_1.$$.fragment.c();
    			attr(div0, "class", "title svelte-1kuxzy1");
    			add_location(div0, file$1, 51, 2, 784);
    			attr(span0, "class", "prefix svelte-1kuxzy1");
    			add_location(span0, file$1, 53, 4, 849);
    			attr(div1, "class", "description svelte-1kuxzy1");
    			add_location(div1, file$1, 52, 2, 819);
    			attr(span1, "class", "prefix svelte-1kuxzy1");
    			add_location(span1, file$1, 57, 4, 933);
    			attr(div2, "class", "me svelte-1kuxzy1");
    			add_location(div2, file$1, 56, 2, 912);
    			attr(div3, "class", "project-container svelte-1kuxzy1");
    			attr(div3, "id", div3_id_value = `project-${ctx.id}-container`);
    			add_location(div3, file$1, 50, 0, 719);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div3, anchor);
    			append(div3, div0);
    			append(div0, t0);
    			append(div3, t1);
    			append(div3, div1);
    			append(div1, span0);
    			append(div1, t3);
    			append(div1, t4);
    			append(div3, t5);
    			append(div3, div2);
    			append(div2, span1);
    			append(div2, t7);
    			append(div2, t8);
    			append(div3, t9);
    			mount_component(tags_1, div3, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.title) {
    				set_data(t0, ctx.title);
    			}

    			if (!current || changed.description) {
    				set_data(t4, ctx.description);
    			}

    			if (!current || changed.me) {
    				set_data(t8, ctx.me);
    			}

    			var tags_1_changes = {};
    			if (changed.tags) tags_1_changes.tags = ctx.tags;
    			tags_1.$set(tags_1_changes);

    			if ((!current || changed.id) && div3_id_value !== (div3_id_value = `project-${ctx.id}-container`)) {
    				attr(div3, "id", div3_id_value);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(tags_1.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(tags_1.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div3);
    			}

    			destroy_component(tags_1, );
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { id, title, description, me, tags } = $$props;

      setTimeout(() => {
        ScrollReveal().reveal("[id^='project-']", {
          distance: "25%",
          origin: "bottom",
          scale: 0.8,
          duration: 1000
        });
      }, 500);

    	const writable_props = ['id', 'title', 'description', 'me', 'tags'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Project> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('title' in $$props) $$invalidate('title', title = $$props.title);
    		if ('description' in $$props) $$invalidate('description', description = $$props.description);
    		if ('me' in $$props) $$invalidate('me', me = $$props.me);
    		if ('tags' in $$props) $$invalidate('tags', tags = $$props.tags);
    	};

    	return { id, title, description, me, tags };
    }

    class Project extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["id", "title", "description", "me", "tags"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.id === undefined && !('id' in props)) {
    			console.warn("<Project> was created without expected prop 'id'");
    		}
    		if (ctx.title === undefined && !('title' in props)) {
    			console.warn("<Project> was created without expected prop 'title'");
    		}
    		if (ctx.description === undefined && !('description' in props)) {
    			console.warn("<Project> was created without expected prop 'description'");
    		}
    		if (ctx.me === undefined && !('me' in props)) {
    			console.warn("<Project> was created without expected prop 'me'");
    		}
    		if (ctx.tags === undefined && !('tags' in props)) {
    			console.warn("<Project> was created without expected prop 'tags'");
    		}
    	}

    	get id() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get me() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set me(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tags() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tags(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ProjectList.svelte generated by Svelte v3.6.4 */

    const file$2 = "src/components/ProjectList.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.project = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (106:4) {#each projects as project, i}
    function create_each_block$1(ctx) {
    	var li, t, current;

    	var project_spread_levels = [
    		{ id: ctx.i },
    		ctx.project
    	];

    	let project_props = {};
    	for (var i_1 = 0; i_1 < project_spread_levels.length; i_1 += 1) {
    		project_props = assign(project_props, project_spread_levels[i_1]);
    	}
    	var project = new Project({ props: project_props, $$inline: true });

    	return {
    		c: function create() {
    			li = element("li");
    			project.$$.fragment.c();
    			t = space();
    			add_location(li, file$2, 106, 6, 2091);
    		},

    		m: function mount(target, anchor) {
    			insert(target, li, anchor);
    			mount_component(project, li, null);
    			append(li, t);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var project_changes = changed.projects ? get_spread_update(project_spread_levels, [
    				{ id: ctx.i },
    				ctx.project
    			]) : {};
    			project.$set(project_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(project.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(project.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(li);
    			}

    			destroy_component(project, );
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	var div2, div1, div0, t_1, ol, current, dispose;

    	var each_value = ctx.projects;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Stuff I've done ▼";
    			t_1 = space();
    			ol = element("ol");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr(div0, "class", "bounce svelte-1lf3fcw");
    			add_location(div0, file$2, 102, 4, 1977);
    			attr(div1, "class", "header svelte-1lf3fcw");
    			add_location(div1, file$2, 101, 2, 1907);
    			attr(ol, "class", "list svelte-1lf3fcw");
    			add_location(ol, file$2, 104, 2, 2032);
    			attr(div2, "class", "projects-container svelte-1lf3fcw");
    			add_location(div2, file$2, 100, 0, 1848);
    			dispose = listen(div1, "click", ctx.scrollToHeader);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div1);
    			append(div1, div0);
    			ctx.div1_binding(div1);
    			append(div2, t_1);
    			append(div2, ol);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			ctx.div2_binding(div2);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.projects) {
    				each_value = ctx.projects;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ol, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) out(i);
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (var i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div2);
    			}

    			ctx.div1_binding(null);

    			destroy_each(each_blocks, detaching);

    			ctx.div2_binding(null);
    			dispose();
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	

      let { projects } = $$props;

      let containerEl;
      let header;

      onMount(() => {
        setTimeout(() => {
          ScrollReveal().reveal(containerEl);
          ScrollReveal().reveal(header, {
            scale: 0.8,
            duration: 1000,
            delay: 3000
          });
        }, 500);
      });

      const scrollToHeader = () => zenscroll.to(header);

    	const writable_props = ['projects'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<ProjectList> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('header', header = $$value);
    		});
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('containerEl', containerEl = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ('projects' in $$props) $$invalidate('projects', projects = $$props.projects);
    	};

    	return {
    		projects,
    		containerEl,
    		header,
    		scrollToHeader,
    		div1_binding,
    		div2_binding
    	};
    }

    class ProjectList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, ["projects"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.projects === undefined && !('projects' in props)) {
    			console.warn("<ProjectList> was created without expected prop 'projects'");
    		}
    	}

    	get projects() {
    		throw new Error("<ProjectList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<ProjectList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ContactList.svelte generated by Svelte v3.6.4 */

    const file$3 = "src/components/ContactList.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.c = list[i];
    	return child_ctx;
    }

    // (11:0) {#each contacts as c}
    function create_each_block$2(ctx) {
    	var a, t_value = ctx.c.medium, t, a_href_value;

    	return {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			attr(a, "target", "_blank");
    			attr(a, "rel", "noopener noreferrer");
    			attr(a, "href", a_href_value = ctx.c.url);
    			attr(a, "class", "svelte-1wdqiqn");
    			add_location(a, file$3, 11, 2, 138);
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			append(a, t);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.contacts) && t_value !== (t_value = ctx.c.medium)) {
    				set_data(t, t_value);
    			}

    			if ((changed.contacts) && a_href_value !== (a_href_value = ctx.c.url)) {
    				attr(a, "href", a_href_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(a);
    			}
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	var each_1_anchor;

    	var each_value = ctx.contacts;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	return {
    		c: function create() {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert(target, each_1_anchor, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (changed.contacts) {
    				each_value = ctx.contacts;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);

    			if (detaching) {
    				detach(each_1_anchor);
    			}
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { contacts } = $$props;

    	const writable_props = ['contacts'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<ContactList> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('contacts' in $$props) $$invalidate('contacts', contacts = $$props.contacts);
    	};

    	return { contacts };
    }

    class ContactList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, ["contacts"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.contacts === undefined && !('contacts' in props)) {
    			console.warn("<ContactList> was created without expected prop 'contacts'");
    		}
    	}

    	get contacts() {
    		throw new Error("<ContactList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contacts(value) {
    		throw new Error("<ContactList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Description.svelte generated by Svelte v3.6.4 */

    const file$4 = "src/components/Description.svelte";

    function create_fragment$4(ctx) {
    	var div2, div0, raw_value = ctx.isShowingShortText ? ctx.short : ctx.long, t0, div1, t1_value = ctx.isShowingShortText ? '►' : '◄', t1, div2_class_value, dispose;

    	return {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			attr(div0, "class", "description svelte-1svqupu");
    			add_location(div0, file$4, 104, 2, 1884);
    			attr(div1, "class", "more svelte-1svqupu");
    			add_location(div1, file$4, 107, 2, 1993);
    			attr(div2, "class", div2_class_value = "" + (ctx.isShowingShortText ? 'wrapper short' : 'wrapper long') + " svelte-1svqupu");
    			add_location(div2, file$4, 101, 0, 1788);
    			dispose = listen(div1, "click", ctx.toggle);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);
    			div0.innerHTML = raw_value;
    			ctx.div0_binding(div0);
    			append(div2, t0);
    			append(div2, div1);
    			append(div1, t1);
    			ctx.div1_binding(div1);
    			ctx.div2_binding(div2);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.isShowingShortText || changed.short || changed.long) && raw_value !== (raw_value = ctx.isShowingShortText ? ctx.short : ctx.long)) {
    				div0.innerHTML = raw_value;
    			}

    			if ((changed.isShowingShortText) && t1_value !== (t1_value = ctx.isShowingShortText ? '►' : '◄')) {
    				set_data(t1, t1_value);
    			}

    			if ((changed.isShowingShortText) && div2_class_value !== (div2_class_value = "" + (ctx.isShowingShortText ? 'wrapper short' : 'wrapper long') + " svelte-1svqupu")) {
    				attr(div2, "class", div2_class_value);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div2);
    			}

    			ctx.div0_binding(null);
    			ctx.div1_binding(null);
    			ctx.div2_binding(null);
    			dispose();
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { short, long } = $$props;

      let wrapperEl;
      let descriptionEl;
      let moreEl;

      let isShowingShortText = true;

      onMount(() => {
        setTimeout(() => {
          ScrollReveal().reveal(descriptionEl, {
            scale: 0.9,
            duration: 1000,
            delay: 1000
          });

          ScrollReveal().reveal(moreEl, {
            scale: 0.0,
            duration: 1000,
            delay: 1000
          });
        }, 500);
      });

      const toggle = () => {
        wrapperEl.style.opacity = 0; $$invalidate('wrapperEl', wrapperEl);
        setTimeout(() => {
          $$invalidate('isShowingShortText', isShowingShortText = !isShowingShortText);
          wrapperEl.style.opacity = 1; $$invalidate('wrapperEl', wrapperEl);
        }, 500);
      };

    	const writable_props = ['short', 'long'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Description> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('descriptionEl', descriptionEl = $$value);
    		});
    	}

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('moreEl', moreEl = $$value);
    		});
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('wrapperEl', wrapperEl = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ('short' in $$props) $$invalidate('short', short = $$props.short);
    		if ('long' in $$props) $$invalidate('long', long = $$props.long);
    	};

    	return {
    		short,
    		long,
    		wrapperEl,
    		descriptionEl,
    		moreEl,
    		isShowingShortText,
    		toggle,
    		div0_binding,
    		div1_binding,
    		div2_binding
    	};
    }

    class Description extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, ["short", "long"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.short === undefined && !('short' in props)) {
    			console.warn("<Description> was created without expected prop 'short'");
    		}
    		if (ctx.long === undefined && !('long' in props)) {
    			console.warn("<Description> was created without expected prop 'long'");
    		}
    	}

    	get short() {
    		throw new Error("<Description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set short(value) {
    		throw new Error("<Description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get long() {
    		throw new Error("<Description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set long(value) {
    		throw new Error("<Description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Me.svelte generated by Svelte v3.6.4 */

    const file$5 = "src/components/Me.svelte";

    function create_fragment$5(ctx) {
    	var div5, div2, div0, t0, t1, div1, t2, t3, div3, t4, div4, current;

    	var contactlist = new ContactList({
    		props: { contacts: ctx.contacts },
    		$$inline: true
    	});

    	var description = new Description({
    		props: {
    		short: ctx.short,
    		long: ctx.long
    	},
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			div5 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(ctx.name);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(ctx.title);
    			t3 = space();
    			div3 = element("div");
    			contactlist.$$.fragment.c();
    			t4 = space();
    			div4 = element("div");
    			description.$$.fragment.c();
    			attr(div0, "class", "name svelte-b3b6vx");
    			add_location(div0, file$5, 97, 4, 1947);
    			attr(div1, "class", "title svelte-b3b6vx");
    			add_location(div1, file$5, 98, 4, 1982);
    			attr(div2, "class", "header svelte-b3b6vx");
    			add_location(div2, file$5, 96, 2, 1901);
    			attr(div3, "class", "contacts svelte-b3b6vx");
    			add_location(div3, file$5, 100, 2, 2026);
    			attr(div4, "class", "content svelte-b3b6vx");
    			add_location(div4, file$5, 103, 2, 2114);
    			attr(div5, "class", "container svelte-b3b6vx");
    			add_location(div5, file$5, 95, 0, 1851);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div5, anchor);
    			append(div5, div2);
    			append(div2, div0);
    			append(div0, t0);
    			append(div2, t1);
    			append(div2, div1);
    			append(div1, t2);
    			ctx.div2_binding(div2);
    			append(div5, t3);
    			append(div5, div3);
    			mount_component(contactlist, div3, null);
    			ctx.div3_binding(div3);
    			append(div5, t4);
    			append(div5, div4);
    			mount_component(description, div4, null);
    			ctx.div5_binding(div5);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.name) {
    				set_data(t0, ctx.name);
    			}

    			if (!current || changed.title) {
    				set_data(t2, ctx.title);
    			}

    			var contactlist_changes = {};
    			if (changed.contacts) contactlist_changes.contacts = ctx.contacts;
    			contactlist.$set(contactlist_changes);

    			var description_changes = {};
    			if (changed.short) description_changes.short = ctx.short;
    			if (changed.long) description_changes.long = ctx.long;
    			description.$set(description_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactlist.$$.fragment, local);

    			transition_in(description.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(contactlist.$$.fragment, local);
    			transition_out(description.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div5);
    			}

    			ctx.div2_binding(null);

    			destroy_component(contactlist, );

    			ctx.div3_binding(null);

    			destroy_component(description, );

    			ctx.div5_binding(null);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	

      let { name, title, contacts, short, long } = $$props;

      let containerEl;
      let headerEl;
      let contactsEl;

      const isSmallScreen = () => window.matchMedia("(max-width: 480px)").matches;

      onMount(() => {
        setTimeout(() => {
          const factor = isSmallScreen() ? 0.85 : 0.8;
          containerEl.style.height = window.innerHeight * factor + "px"; $$invalidate('containerEl', containerEl);

          ScrollReveal().reveal(headerEl, {
            distance: "150%",
            origin: "top",
            duration: 1000
          });

          ScrollReveal().reveal(contactsEl, {
            distance: "20%",
            origin: "left",
            scale: 0.9,
            duration: 1000,
            delay: 1500
          });
        }, 500);
      });

    	const writable_props = ['name', 'title', 'contacts', 'short', 'long'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Me> was created with unknown prop '${key}'`);
    	});

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('headerEl', headerEl = $$value);
    		});
    	}

    	function div3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('contactsEl', contactsEl = $$value);
    		});
    	}

    	function div5_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('containerEl', containerEl = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('title' in $$props) $$invalidate('title', title = $$props.title);
    		if ('contacts' in $$props) $$invalidate('contacts', contacts = $$props.contacts);
    		if ('short' in $$props) $$invalidate('short', short = $$props.short);
    		if ('long' in $$props) $$invalidate('long', long = $$props.long);
    	};

    	return {
    		name,
    		title,
    		contacts,
    		short,
    		long,
    		containerEl,
    		headerEl,
    		contactsEl,
    		div2_binding,
    		div3_binding,
    		div5_binding
    	};
    }

    class Me extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, ["name", "title", "contacts", "short", "long"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<Me> was created without expected prop 'name'");
    		}
    		if (ctx.title === undefined && !('title' in props)) {
    			console.warn("<Me> was created without expected prop 'title'");
    		}
    		if (ctx.contacts === undefined && !('contacts' in props)) {
    			console.warn("<Me> was created without expected prop 'contacts'");
    		}
    		if (ctx.short === undefined && !('short' in props)) {
    			console.warn("<Me> was created without expected prop 'short'");
    		}
    		if (ctx.long === undefined && !('long' in props)) {
    			console.warn("<Me> was created without expected prop 'long'");
    		}
    	}

    	get name() {
    		throw new Error("<Me>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Me>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Me>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Me>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contacts() {
    		throw new Error("<Me>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contacts(value) {
    		throw new Error("<Me>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get short() {
    		throw new Error("<Me>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set short(value) {
    		throw new Error("<Me>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get long() {
    		throw new Error("<Me>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set long(value) {
    		throw new Error("<Me>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.6.4 */

    const file$6 = "src/App.svelte";

    function create_fragment$6(ctx) {
    	var main, t, current;

    	var me_spread_levels = [
    		content.me
    	];

    	let me_props = {};
    	for (var i = 0; i < me_spread_levels.length; i += 1) {
    		me_props = assign(me_props, me_spread_levels[i]);
    	}
    	var me = new Me({ props: me_props, $$inline: true });

    	var projectlist = new ProjectList({
    		props: { projects: content.projects },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			main = element("main");
    			me.$$.fragment.c();
    			t = space();
    			projectlist.$$.fragment.c();
    			attr(main, "class", "main-container svelte-s5py68");
    			add_location(main, file$6, 17, 0, 328);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, main, anchor);
    			mount_component(me, main, null);
    			append(main, t);
    			mount_component(projectlist, main, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var me_changes = changed.content ? get_spread_update(me_spread_levels, [
    				content.me
    			]) : {};
    			me.$set(me_changes);

    			var projectlist_changes = {};
    			if (changed.content) projectlist_changes.projects = content.projects;
    			projectlist.$set(projectlist_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(me.$$.fragment, local);

    			transition_in(projectlist.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(me.$$.fragment, local);
    			transition_out(projectlist.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(main);
    			}

    			destroy_component(me, );

    			destroy_component(projectlist, );
    		}
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$6, safe_not_equal, []);
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
