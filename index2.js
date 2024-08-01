
const showButtons = document.querySelectorAll('.show-button'); 
const bomb = document.querySelectorAll('#bomb');



showButtons.forEach(button => {
  button.addEventListener('click', function() {
    function_("show"); 
  });
}); 
  function function_(showValue) {
    console.log("show value:", showValue);
  }


let buttonAdded = false;

function myFunction() {
    if (buttonAdded) return;

    const itemsContainer = document.querySelectorAll('.show-button'); 

    const buttons = [];
  
    for (let i = 0; i < 7; i++) {
      const button = document.createElement('button');
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      button.textContent = `Button ${randomNumber}`;
      buttons.push(button); 
     }
  
    // buttons.sort(() => Math.random() - 0.5);

    const shuffledItemsContainer = Array.from(itemsContainer).sort(() => Math.random() - 0.5);
    
    shuffledItemsContainer.forEach((item, index) => {
      if (index < buttons.length) {
        item.appendChild(buttons[index]); 
        console.log('item :', item);
      }
    });






    const bombIndex = Math.floor(Math.random() * buttons.length);
  
    buttons[bombIndex].addEventListener('click', () => {
      console.log('Bomb clicked!');
    });
  
    buttons.forEach((button, index) => {
      if (index !== bombIndex) {
        button.addEventListener('click', () => {
          console.log(`Button ${button.textContent} clicked!`);
        });
      }
    });
  
    buttonAdded = true;
}