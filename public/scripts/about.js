const toggleButton = document.getElementById('toggleButton');
const extraImages = document.getElementById('extraImages');
let visible = false;
toggleButton.addEventListener('click', () => {
      visible = !visible;
      extraImages.classList.toggle('hidden', !visible);
    });

    // Optional: Klick auf Game2 oder Game3 schließt sie auch wiede
document.querySelectorAll('#extraImages img').forEach(img => {
  img.addEventListener('click', () => {
    visible = false;
    extraImages.classList.add('hidden');
  });
});
