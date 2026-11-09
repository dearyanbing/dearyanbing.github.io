'use strict';

document.querySelectorAll('.travel-gallery').forEach(function (gallery) {
  let activeCard = null;

  gallery.querySelectorAll('.travel-card').forEach(function (card) {
    const photo = card.querySelector('.travel-card__photo');
    const back = card.querySelector('.travel-card__back');
    const story = card.querySelector('.travel-card__story');

    function flip(showStory, moveFocus = true) {
      card.classList.toggle('is-flipped', showStory);
      photo.setAttribute('aria-expanded', String(showStory));

      const visibleFace = showStory ? back : photo;
      const hiddenFace = showStory ? photo : back;
      visibleFace.inert = false;
      visibleFace.setAttribute('aria-hidden', 'false');
      if (moveFocus) {
        (showStory ? story : photo).focus({ preventScroll: true });
      }
      hiddenFace.inert = true;
      hiddenFace.setAttribute('aria-hidden', 'true');
    }

    function toggle() {
      const showStory = !card.classList.contains('is-flipped');
      if (activeCard && activeCard.element !== card) {
        activeCard.flip(false, false);
      }
      flip(showStory);
      activeCard = showStory ? { element: card, flip: flip } : null;
    }

    card.addEventListener('click', function (event) {
      if (back.contains(event.target)) {
        // Let readers follow links or select story text without closing the card.
        if (event.target.closest('a, button, input, textarea, select, summary, [contenteditable]')) {
          return;
        }
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && back.contains(selection.anchorNode)) {
          return;
        }
      }
      toggle();
    });

    card.addEventListener('keydown', function (event) {
      const closeWithEscape = event.key === 'Escape' && card.classList.contains('is-flipped');
      const toggleFromStory = event.target === story && (event.key === 'Enter' || event.key === ' ');
      if ((closeWithEscape || toggleFromStory) && !event.repeat) {
        event.preventDefault();
        toggle();
      }
    });
  });
});
