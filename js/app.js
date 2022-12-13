//defines globale variables
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('.navbar__menu');
const navBarUL = document.getElementById('navbar__list');
const docFragment = document.createDocumentFragment();
const scrollToTopButton = document.querySelector('.scroll_top');
const collapsButtons = document.querySelectorAll('.collap-section');


// function to build navigation menu bar 
function buildNavBarUl() {
    sections.forEach(section => {
        const ListItems = document.createElement('li');
        ListItems.innerHTML = `<a href=#${section.id} class='menu__link' data-nav='${section.dataset.nav}'>${section.dataset.nav}</a>`;
        docFragment.appendChild(ListItems);
    })
    navBarUL.appendChild(docFragment);
}
buildNavBarUl();


// Add an 'active' class to section when near top of viewport
const linkItems = document.querySelectorAll('a');
const listItems = document.querySelectorAll('li');

//toggleActiveState function which use an intersection observer to detect the section position relaive to viewport 
function toggleActiveState() {

    /*craet an intersection observer with options of: 
    root: is the viewport (null), threshoolds is set to 1, while excute the callback function one time for each intersection with
    viewport. so they are not passed, and root margins is changed from (-50px top and -450px bottom) to -80px top and -200px bottom the viewport to adjuste the 
    intersection area with the viewport and to adjusteit  on small screens*/
    let secObserverOptions = { rootMargin: '-80px 0px -200px 0px' };

    //callback function that excute every time the section intersects the viewport. 
    let secObsCallBack = (entries, sectionObserver) => {
        entries.forEach(entry => {

            //detect the intersection between section and viewport
            if (entry.isIntersecting) {

                //adding the active class to link when the relative section is intersected with viewport
                //adding the active class to the only viewed section (intersected section with viewport)
                entry.target.classList.add('your-active-class');
                linkItems.forEach(link => {
                    if (link.dataset.nav === entry.target.dataset.nav) {
                        link.classList.add('link__active');
                    }
                })
            }
            //removing the active class for all sections and links in case of sections are not intersected
            else {
                entry.target.classList.remove('your-active-class');
                linkItems.forEach(link => {
                    if (link.dataset.nav === entry.target.dataset.nav) {
                        link.classList.remove('link__active');
                    }
                })
            }
        })
    }
    //intersection observer to observe the sections when inntersecting with viewport
    let sectionObserver = new IntersectionObserver(secObsCallBack, secObserverOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    })
};
//finally passing the toggleActiveState function to the windoww scroll event to listen for scrolling and excute it
window.addEventListener('scroll', toggleActiveState);


//listen to a navbar click event to scroll to a certian section using the value of the link 'href' 
linkItems.forEach(link => {
    link.addEventListener('click', scrollToSection);

    let selectedSection;
    function scrollToSection(event) {

        //stop the default event of the anchor element 
        event.preventDefault();

        //sellect the section relative to link`s href value
        selectedSection = document.querySelector(link.getAttribute('href'));
        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
})


// hide nav bar with stop scrolling and show it again with scrolling
let lastScroll = window.scrollY;

//use a timer after stop scrolling 
let timeToHideNavBar;

window.addEventListener('scroll', function () {

    let nextScroll = window.scrollY;

    //dispaly nav bar and cansel the timer in case of scrolling
    if ((nextScroll !== lastScroll)) {
        navBar.style.display = 'block';

        //then cansel the timer while scrolling and exite the code
        clearTimeout(timeToHideNavBar);
    }
    //in case of stop scrolling, after 3 seconds hide the nav bar and exite the code
    timeToHideNavBar = setTimeout(function () {
        navBar.style.display = 'none';
    }, 3000)
})

//listen to click to scroll to the top page
scrollToTopButton.onclick = function () {
    window.scrollTo({
        top: 0,//x= 0, y= 0
        behavior: "smooth"
    })
}

//hide and show the the scroll to top button  
window.onscroll = function () {
    if (window.scrollY >= 1500) { //scrolled distance to reach near the bottom
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

//collapse sections
collapsButtons.forEach(btn => {
    btn.addEventListener('click', function () {

        sections.forEach(section => {
            if (btn.dataset.collaps === section.id) {

                //select the section relative to the order of the button
                collapsedSection = document.querySelector(`#${section.id}`)
            }
        })
        //add an activte class to button with collapsid section
        activeBtn = document.querySelector(`#${btn.id}`)

        activeBtn.classList.toggle('active');

        // collapse and uncollapse sections
        if (collapsedSection.style.display === 'block') {

            collapsedSection.style.display = 'none';
        }
        else {
            collapsedSection.style.display = 'block';
        }
    })
})