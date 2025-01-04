const mobileNav = () => {

    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks_1 = document.querySelectorAll('.mobile-nav__link_1');
    const mobileLinks_2 = document.querySelectorAll('.mobile-nav__link_2');
    const mobileLinks_3 = document.querySelectorAll('.mobile-nav__link_3');
    const mobileLinks_4 = document.querySelectorAll('.mobile-nav__link_4');
    const mobileLinks_5 = document.querySelectorAll('.mobile-nav__btn');

    let isMobileNavOpen = false;

    headerBtn.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        if(isMobileNavOpen){
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
        }

        else{
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
    });

    mobileLinks_1.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.boday.style.overflowY = 'auto';

        });
    });

    mobileLinks_2.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.boday.style.overflowY = 'auto';

        });
    });

    mobileLinks_3.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.boday.style.overflowY = 'auto';

        });
    });

    mobileLinks_4.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.boday.style.overflowY = 'auto';

        });
    });

    mobileLinks_5.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.boday.style.overflowY = 'auto';

        });
    });

};

export default mobileNav;