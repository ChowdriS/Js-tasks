const list = document.getElementById('sortable-list');
let draggedItem = null;

list.addEventListener('dragstart', e => {
    draggedItem = e.target;
    e.target.classList.add('dragging');
});

list.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = findDropPosition(list, e.clientY);
    list.insertBefore(draggedItem, afterElement);
});

list.addEventListener('dragend', e => {
    e.target.classList.remove('dragging');
    draggedItem = null;
});

function findDropPosition(container, mouseY) {
    const items = [...container.querySelectorAll('li:not(.dragging)')];
    
    for(const item of items) {
        const { top, height } = item.getBoundingClientRect();
        const itemCenter = top + height/2;
        
        if(mouseY < itemCenter) {
            return item;
        }
    }
    
    return null; 
}