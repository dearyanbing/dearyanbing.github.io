'use strict';

document.querySelectorAll('.travel-card').forEach(function (card) {
  const photo = card.querySelector('.travel-card__photo');
  const back = card.querySelector('.travel-card__back');
  const story = card.querySelector('.travel-card__story');
  const returnButton = card.querySelector('.travel-card__return');

  function flip(showStory) {
    card.classList.toggle('is-flipped', showStory);
    photo.setAttribute('aria-expanded', String(showStory));

    const visibleFace = showStory ? back : photo;
    const hiddenFace = showStory ? photo : back;
    visibleFace.inert = false;
    visibleFace.setAttribute('aria-hidden', 'false');
    (showStory ? story : photo).focus({ preventScroll: true });
    hiddenFace.inert = true;
    hiddenFace.setAttribute('aria-hidden', 'true');
  }

  photo.addEventListener('click', function () { flip(true); });
  returnButton.addEventListener('click', function () { flip(false); });
  card.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
      event.preventDefault();
      flip(false);
    }
  });
});
