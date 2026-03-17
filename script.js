// 移动菜单切换
const menuButton = document.querySelector('.md\:hidden button');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
    <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于我</a></li>
        <li><a href="#ai-solutions">AI方案</a></li>
        <li><a href="courses.html">课程内容</a></li>
        <li><a href="#opinions">观点集锦</a></li>
        <li><a href="#contact">联系方式</a></li>
    </ul>
`;
document.body.appendChild(mobileMenu);

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// 点击移动菜单链接后关闭菜单
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// 滚动时导航栏效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-black', 'bg-opacity-90');
        nav.classList.remove('bg-opacity-80');
    } else {
        nav.classList.add('bg-opacity-80');
        nav.classList.remove('bg-black', 'bg-opacity-90');
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 加载动画
window.addEventListener('load', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(loading);
        }, 500);
    }, 1000);
});

// 数字计数器动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// 当元素进入视口时触发计数器动画
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
});

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    counterObserver.observe(counter);
});

// 鼠标跟随效果
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 添加鼠标跟随样式
const style = document.createElement('style');
style.textContent = `
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #06b6d4;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .cursor:hover {
        transform: scale(1.5);
    }
`;
document.head.appendChild(style);