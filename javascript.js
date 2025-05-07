document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('prtProjectsTrack');
    const prevBtn = document.getElementById('prtPrevBtn');
    const nextBtn = document.getElementById('prtNextBtn');
    const dotsContainer = document.getElementById('prtDots');
    
    const cards = Array.from(track.getElementsByClassName('prt-project-card'));
    const cardWidth = cards[0].offsetWidth + 30; // Width + margin
    
    let currentIndex = 0;
    let cardPerView = Math.floor(track.parentElement.offsetWidth / cardWidth);
    cardPerView = cardPerView > 0 ? cardPerView : 1;
    
    const maxIndex = cards.length - cardPerView;
    
    // Criar pontos indicadores
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.classList.add('prt-dot');
      if (i === 0) dot.classList.add('prt-active');
      dot.dataset.index = i;
      dot.addEventListener('click', function() {
        goToIndex(parseInt(this.dataset.index));
      });
      dotsContainer.appendChild(dot);
    }
    
    function updateDots() {
      const dots = dotsContainer.getElementsByClassName('prt-dot');
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('prt-active');
      }
      dots[currentIndex].classList.add('prt-active');
    }
    
    function goToIndex(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      updateDots();
    }
    
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        goToIndex(currentIndex - 1);
      }
    });
    
    nextBtn.addEventListener('click', function() {
      if (currentIndex < maxIndex) {
        goToIndex(currentIndex + 1);
      }
    });
    
    // Efeito de destaque ao passar o mouse
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        cards.forEach(c => {
          if (c !== card) {
            c.style.opacity = '0.7';
            c.style.filter = 'blur(1px)';
          }
        });
      });
      
      card.addEventListener('mouseleave', function() {
        cards.forEach(c => {
          c.style.opacity = '1';
          c.style.filter = 'none';
        });
      });
    });
    
    // Responsividade
    window.addEventListener('resize', function() {
      cardPerView = Math.floor(track.parentElement.offsetWidth / cardWidth);
      cardPerView = cardPerView > 0 ? cardPerView : 1;
      const newMaxIndex = cards.length - cardPerView;
      
      // Ajustar índice atual se necessário
      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
      
      // Recriar pontos
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= newMaxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('prt-dot');
        if (i === currentIndex) dot.classList.add('prt-active');
        dot.dataset.index = i;
        dot.addEventListener('click', function() {
          goToIndex(parseInt(this.dataset.index));
        });
        dotsContainer.appendChild(dot);
      }
    });
  });

// ====================================================
// Technology Carousel Implementation
// ====================================================
   // Inicializar o carrossel de tecnologias


const techCarousel = document.querySelector('.carousel-container');
const techRows = document.querySelectorAll('.tech-row');
const techDots = document.querySelectorAll('.skills-carousel .dot');
const techPrevBtn = document.querySelector('.skills-carousel .prev');
const techNextBtn = document.querySelector('.skills-carousel .next');

let techCurrentIndex = 0;
const techRowCount = techRows.length;

// Função para atualizar o carrossel de tecnologias
function updateTechCarousel() {
    const translateValue = -techCurrentIndex * 100 + '%';
    techCarousel.style.transform = `translateX(${translateValue})`;
    
    // Atualizar os dots
    techDots.forEach((dot, index) => {
        if (index === techCurrentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Botão próximo
techNextBtn.addEventListener('click', () => {
    techCurrentIndex = (techCurrentIndex + 1) % techRowCount;
    updateTechCarousel();
});

// Botão anterior
techPrevBtn.addEventListener('click', () => {
    techCurrentIndex = (techCurrentIndex - 1 + techRowCount) % techRowCount;
    updateTechCarousel();
});

// Navegação por dots
techDots.forEach(dot => {
    dot.addEventListener('click', () => {
        techCurrentIndex = parseInt(dot.getAttribute('data-index'));
        updateTechCarousel();
    });
});

// Auto-slide
let techAutoSlideInterval = setInterval(() => {
    techCurrentIndex = (techCurrentIndex + 1) % techRowCount;
    updateTechCarousel();
}, 4500);

// Parar o auto-slide quando o mouse está sobre o carrossel
document.querySelector('.skills-carousel').addEventListener('mouseenter', () => {
    clearInterval(techAutoSlideInterval);
});

// Reiniciar o auto-slide quando o mouse sai do carrossel
document.querySelector('.skills-carousel').addEventListener('mouseleave', () => {
    clearInterval(techAutoSlideInterval);
    techAutoSlideInterval = setInterval(() => {
        techCurrentIndex = (techCurrentIndex + 1) % techRowCount;
        updateTechCarousel();
    }, 4500);
});

// Inicializar ambos os carrosséis
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os elementos existem antes de inicializar
    if (mainCarousel) updateMainCarousel();
    if (techCarousel) updateTechCarousel();
});

// ====================================================
// formulario de contato
// ====================================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const emailAddress = "luisrodrigo.furtado123@gmail.com";
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Opção 1: Usando mailto (funciona sem backend mas abre o cliente de email)
    const mailtoSubject = encodeURIComponent("Contato pelo site - " + name);
    const mailtoBody = encodeURIComponent(
      "Nome: " + name + "\n" +
      "Email: " + email + "\n\n" +
      "Mensagem:\n" + message
    );
    
    window.location.href = `mailto:${emailAddress}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Limpar formulário após envio
    contactForm.reset();
    

  });
});