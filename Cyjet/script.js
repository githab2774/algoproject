document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.story');
  const description = document.getElementById('description');
  const imageBlock = document.getElementById('imageBlock');
  const storyImage = document.getElementById('storyImage');
  const placeholderText = document.getElementById('placeholderText');

  const stories = {
    1: {
      image: 'story1.jpg',
      text: 'Вы просыпаетесь в старом особняке. Часы на стене остановились на 3:17...'
    },
    2: {
      image: 'story2.jpg',
      text: 'Тёмная аллея. Фонарь мигает. Вы слышите шаги за спиной...'
    },
    3: {
      image: 'story3.jpg',
      text: 'Заброшенная лаборатория. На столе лежат странные записи...'
    }
  };

  function showStory(storyId) {
    const story = stories[storyId];

    // Обновляем изображение
    if (story.image) {
      storyImage.src = story.image;
      storyImage.alt = `Изображение для сюжета ${storyId}`;
      storyImage.style.display = 'block';
      placeholderText.style.display = 'none';
    } else {
      storyImage.style.display = 'none';
      placeholderText.style.display = 'flex';
    }

    // Обновляем описание
    description.textContent = story.text;
  }

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем немедленный переход

      const targetUrl = link.getAttribute('href');
      const id = link.dataset.story;

      // Обновляем интерфейс
      links.forEach(lnk => {
        lnk.classList.remove('active');
      });
      link.classList.add('active');
      showStory(id);

      // Запускаем таймер (3 секунды = 3000 мс)
      const delay = 3000;

      // Показываем таймер в placeholder
      placeholderText.textContent = `Переход через ${delay / 1000}...`;
      placeholderText.style.display = 'flex';

      let countdown = delay / 1000;
      const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          placeholderText.textContent = `Переход через ${countdown}...`;
        } else {
          clearInterval(timer);
          // Выполняем переход после завершения отсчёта
          window.location.href = targetUrl;
        }
      }, 1000);
    });
  });

  // Показываем первый сюжет при загрузке
  showStory('1');
});
