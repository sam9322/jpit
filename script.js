document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // --- Scroll Header ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Dark Mode ---
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // --- Mobile Menu ---
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navMenu.classList.contains('active') ? 'fa-times' : 'fa-bars';
    mobileToggle.innerHTML = `<i class="fas ${icon}"></i>`;
  });

  // --- Utility specific for backend check ---
  const dbStatusPill = document.getElementById('db-status-pill');
  if(dbStatusPill) {
    fetch('http://localhost:5000/api/health')
      .then(res => {
        if(res.ok) {
          dbStatusPill.className = 'status-pill online';
          dbStatusPill.innerHTML = '<i class="fas fa-database"></i> Database: Online';
        }
      })
      .catch(err => {
        dbStatusPill.className = 'status-pill offline';
        dbStatusPill.innerHTML = '<i class="fas fa-database"></i> Database: Offline';
      });
  }

  // --- Discovery Modal logic ---
  const discoveryModal = document.getElementById('discovery-modal');
  const closeDiscovery = document.getElementById('close-discovery-modal');
  const openDiscoveryBtns = document.querySelectorAll('#open-discovery-modal, #open-discovery-modal-nav');
  const discoveryForm = document.getElementById('discovery-form');
  const modalSuccess = document.getElementById('modal-success');

  if(discoveryModal) {
    openDiscoveryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        discoveryModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });

    closeDiscovery.addEventListener('click', () => {
      discoveryModal.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => {
        discoveryForm.reset();
        discoveryForm.classList.remove('hidden');
        modalSuccess.classList.add('hidden');
      }, 300);
    });

    discoveryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = discoveryForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      btn.disabled = true;

      // Simulate a successful network request since the backend is detached
      setTimeout(() => {
        discoveryForm.classList.add('hidden');
        modalSuccess.classList.remove('hidden');
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1200);
    });
  }

  // --- Auth Modal logic ---
  const authModal = document.getElementById('auth-modal');
  const openAuthBtn = document.getElementById('open-auth-modal');
  const closeAuthBtn = document.getElementById('close-auth-modal');
  
  const loginSection = document.getElementById('login-section');
  const signupSection = document.getElementById('signup-section');
  const showSignupBtn = document.getElementById('show-signup');
  const showLoginBtn = document.getElementById('show-login');
  
  const demoLoginBtn = document.getElementById('demo-login');
  const authSuccess = document.getElementById('auth-success');
  const authContainer = document.getElementById('auth-container');

  if(authModal) {
    openAuthBtn.addEventListener('click', () => {
      authModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    closeAuthBtn.addEventListener('click', () => {
      authModal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    showSignupBtn.addEventListener('click', () => {
      loginSection.classList.add('hidden');
      signupSection.classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', () => {
      signupSection.classList.add('hidden');
      loginSection.classList.remove('hidden');
    });

    // Handle standard login/signup (mock/simulated)
    const loginForm = document.getElementById('login-form');
    if(loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        simulateAuthSuccess('Welcome back!');
      });
    }

    const signupForm = document.getElementById('signup-form');
    if(signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        simulateAuthSuccess('Account created successfully!');
      });
    }

    if(demoLoginBtn) {
      demoLoginBtn.addEventListener('click', () => {
        simulateAuthSuccess('Demo User Logged In.');
      });
    }

    function simulateAuthSuccess(msg) {
      loginSection.classList.add('hidden');
      signupSection.classList.add('hidden');
      authSuccess.classList.remove('hidden');
      document.getElementById('auth-success-msg').textContent = msg;

      setTimeout(() => {
        authModal.classList.add('hidden');
        document.body.style.overflow = '';
        authContainer.innerHTML = `
          <div class="profile-name">
            <i class="fas fa-user-circle" style="font-size:1.2rem"></i> Demo User
            <button class="logout-btn" id="logout-btn">Logout</button>
          </div>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
          location.reload();
        });
      }, 1500);
    }
  }
});
