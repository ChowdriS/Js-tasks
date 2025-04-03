const Home = () => {
    return `
    <div id="home" class="section">
        <h2>Welcome to My Portfolio</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum exercitationem magni officia eum debitis eveniet facere odio minima recusandae fugiat.</p>
        </div>
        `
};

const Project = () =>{
    return `
        <div id="projects" class="section">
        <h2>My Projects</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis itaque accusamus expedita unde amet nobis molestias illum ullam magni aliquam.</p>
        </div>
    `
}

const About = () =>{
    return `
        <div id="about" class="section">
        <h2>About</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis itaque accusamus expedita unde amet nobis molestias illum ullam magni aliquam.</p>
        </div>
    `
}
    
const Contact = () => {
    return `
    <div id="contact" class="section">
        <h2>Contact Me</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam ex sint accusamus neque obcaecati ratione iste, odit quia natus harum.</p>
        </div>
        `
};
    const routes = {
        "#home" : Home,
        "#contact" : Contact,
        "#projects" : Project,
        "#about" : About
    }
function doRoute(){
    const route = window.location.hash || '#home';
    const funcToIntiate = routes[route];
    document.querySelector('.container').innerHTML = funcToIntiate();
}
document.addEventListener('DOMContentLoaded',doRoute);
window.addEventListener('hashchange',doRoute);
