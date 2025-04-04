let page = 0;
let isLoading = false;
const limit = 10;

const grid = document.getElementById('grid');
const loadingIndicator = document.getElementById('loading');
const errorElement = document.getElementById('error');

function createCard(product) {
    return `
        <div class="card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="card-content">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}/5</p>
            </div>
        </div>
    `;
}

async function loadMoreProducts() {
    if (isLoading) return;
    
    isLoading = true;
    loadingIndicator.style.display = 'block';
    errorElement.style.display = 'none';

    try {
        const response = await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        console.log(data)
        const products = data.products;
        
        if (products.length > 0) {
            const cards = products.map(createCard).join('');
            grid.innerHTML += cards;
            page++;
        }
    } catch (error) {
        errorElement.style.display = 'block';
        console.error('Error:', error);
    } finally {
        isLoading = false;
        loadingIndicator.style.display = 'none';
    }
}

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreProducts();
    }
}

document.addEventListener("DOMContentLoaded",loadMoreProducts);
window.addEventListener('scroll', handleScroll);