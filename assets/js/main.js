// frontend/assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Create alert element
    const loadingAlert = document.createElement('div');
    loadingAlert.className = 'top-loading-alert fixed top-0 left-0 w-full  text-white text-center py-2 z-50 shadow-lg';
    loadingAlert.textContent = "Data are loading, please wait. It's a render free trial.";
    loadingAlert.style.position = 'fixed';
    loadingAlert.style.top = '70px';
    loadingAlert.style.left = '0';
    loadingAlert.style.width = '100%';
    loadingAlert.style.padding = '10px';
    loadingAlert.style.fontWeight = 'bold';
    loadingAlert.style.zIndex = '10000';
    loadingAlert.style.backgroundColor = '#ff000047'; 
    
    // Insert alert into DOM immediately
    if (!document.body.contains(loadingAlert)) {
        document.body.insertBefore(loadingAlert, document.body.firstChild);
        loadingAlert.style.display = 'block';
    }

    // Function to hide alert
    function hideLoadingAlert() {
        if (document.body.contains(loadingAlert)) {
             loadingAlert.style.display = 'none';
        }
    }


    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopButton = document.getElementById('back-to-top');

    // Initial theme setting based on localStorage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') 
            ? '<i class="fas fa-bars"></i>' 
            : '<i class="fas fa-times"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
            backToTopButton.classList.add('flex');
        } else {
            backToTopButton.classList.add('hidden');
            backToTopButton.classList.remove('flex');
        }
    });

    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });





// Track loading state of projects and skills
let projectsLoading = false;
let skillsLoading = false;

// Modify fetchProjects to show alert when starting and hide when done
async function fetchProjects() {
    projectsLoading = true;
    

    // existing fetchProjects code here...

    try {
        // existing try block code...
    } catch (error) {
        // existing catch block code...
    } finally {
        projectsLoading = false;
       
    }
}

// Modify fetchSkills similarly
async function fetchSkills() {
    skillsLoading = true;
   

    // existing fetchSkills code here...

    try {
        // existing try block code...
    } catch (error) {
        // existing catch block code...
    } finally {
        skillsLoading = false;
      
    }
}
  

    // ====== Intégration de l'API (Connexion Frontend-Backend) ======

    // Ceci est l'URL de ton API Backend déployée sur Render
    const BASE_API_URL = 'https://portfolio-backend-wk2p.onrender.com';

    // Sélectionne les éléments HTML où les projets et compétences seront affichés
    const projectsContainer = document.getElementById('projects-container');
    const viewAllProjectsButton = document.getElementById('view-all-projects-button');

    // ** المتغير الجديد لقسم المهارات الديناميكي **
    const dynamicSkillsContainer = document.getElementById('dynamic-skills-categories-container');

    // Stocke tous les projets récupérés pour la fonctionnalité "Voir tous les projets"
    let allProjects = [];
    // Nombre de projets récents à afficher initialement (ici, 3 projets)
    const INITIAL_PROJECTS_TO_SHOW = 3; 

    // ----------------------------------------------------
    // Fonctions spécifiques aux Projets
    // ----------------------------------------------------

    // Fonction pour créer la carte HTML d'un projet
    function createProjectCard(project) {
        // ** التعديل هنا: تحويل 'technologies' من نص إلى قائمة قبل استعمال 'map' **
        const technologiesArray = project.technologies ? 
                                  project.technologies.split(',').map(tech => tech.trim()) : 
                                  [];
        
        // Construit le code HTML pour les "Technologies" utilisées
        const technologiesHtml = technologiesArray.map(tech => `<span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">${tech}</span>`).join('');

        // Retourne la structure HTML complète de la carte de projet
        return `
        <div class="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                    <div class="relative overflow-hidden h-60">
                        <img src="${project.image_url || 'https://via.placeholder.com/400x250?text=Image+du+projet'}" 
                            alt="${project.title}" 
                            class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        <div class="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${technologiesHtml}
           
                        </div>
                        <a href="${project.project_url}"  class="text-primary-500 font-medium hover:text-primary-600 transition">View website →</a>
                        
                    </div>
                </div>
                  
        `;
    }

    // Fonction pour afficher les projets dans la page HTML
    function renderProjects(projectsToRender) {
        if (!projectsContainer) return; // تأكد من وجود العنصر
        projectsContainer.innerHTML = ''; // D'abord, on vide le conteneur des projets existants
        projectsToRender.forEach(project => {
            // Crée une carte pour chaque projet et l'ajoute au conteneur
            projectsContainer.innerHTML += createProjectCard(project);
        });
    }

    // Fonction asynchrone pour récupérer les projets du Backend
    async function fetchProjects() {
        if (!projectsContainer) return; // تأكد من وجود العنصر
            //the loading animation
                // Dynamically add jQuery first
      
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'assets/deadline/jquery.js';
    document.body.appendChild(jqueryScript);
    
    // When jQuery is loaded, add loader CSS and JS, then insert loader HTML
     jqueryScript.onload = () => {
        // Dynamically add CSS
        const loaderCss = document.createElement('link');
        loaderCss.rel = 'stylesheet';
        loaderCss.href = 'assets/deadline/deadline-loading.css';
        document.head.appendChild(loaderCss);

        // Dynamically add loader JS
        const loaderScript = document.createElement('script');
        loaderScript.src = 'assets/deadline/deadline-loading.js';
        document.body.appendChild(loaderScript);
        loaderScript.onload = () => {
        // Insert loader HTML
        fetch('/assets/deadline/deadline-loading.html')
            .then(response => response.text())
            .then(html => {
                projectsContainer.classList.add('loading');
                projectsContainer.innerHTML = html;
            });
        };
    };
        // projectsContainer.innerHTML =
        //  '<p class="text-center text-gray-500 dark:text-gray-400 col-span-full">Chargement des projets...</p>';
             //await new Promise(resolve => setTimeout(resolve, 100000000000));
    
        try {
            // Envoie une requête au Backend pour obtenir les projets
            const response = await fetch(`${BASE_API_URL}/api/projects/`);
            // Vérifie si la requête a réussi (statut HTTP 200)
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            // Convertit les données reçues en objet JavaScript
            let projects = await response.json();

            // Trie les projets par date de création, les plus récents en premier
            projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            
            allProjects = projects; // Stocke tous les projets récupérés

            // مسح رسالة التحميل
            projectsContainer.classList.remove('loading');
            projectsContainer.innerHTML = '';

            // عرض المشاريع
            if (allProjects.length === 0) {
                projectsContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400 col-span-full">Aucun projet disponible pour le moment.</p>';
            } else {
                renderProjects(allProjects.slice(0, INITIAL_PROJECTS_TO_SHOW));
            }
            
            // Affiche/masque le bouton "Voir tous les projets" si il y a plus de projets que ceux affichés initialement
            if (viewAllProjectsButton) { // التأكد من وجود الزر
                if (allProjects.length > INITIAL_PROJECTS_TO_SHOW) {
                    viewAllProjectsButton.classList.remove('hidden'); // Affiche le bouton
                } else {
                    viewAllProjectsButton.classList.add('hidden'); // Masque le bouton
                }
            }

        } catch (error) {
            // En cas d'erreur, l'affiche dans la console et sur la page
            console.error("Erreur lors de la récupération des projets:", error);
            if (projectsContainer) {
                projectsContainer.classList.remove('loading');
                projectsContainer.innerHTML = `<p class="text-red-500 dark:text-red-400 col-span-full">Échec du chargement des projets. Veuillez réessayer plus tard.</p>`;
            }
        }
    }
    // Écouteur d'événement pour le clic sur le bouton "Voir tous les projets"
    if (viewAllProjectsButton) {
        viewAllProjectsButton.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            renderProjects(allProjects); // Affiche tous les projets
            viewAllProjectsButton.classList.add('hidden'); // Masque le bouton après avoir tout affiché
        });
    }

    // ----------------------------------------------------
    // Fonctions spécifiques aux Compétences (Skills) - **محدثة لتكون ديناميكية**
    // ----------------------------------------------------

    // دالة مساعدة لإنشاء عنصر قائمة المهارة
    function createSkillListItem(skill) {
        return `
            <li class="flex justify-between items-center">
                <span>${skill.name}</span>
                <span class="text-primary-500">${skill.level}%</span>
            </li>
        `;
    }

    // دالة لجلب وعرض المهارات ديناميكياً
    async function fetchSkills() {
        if (!dynamicSkillsContainer) { // للتأكد أن الـelement موجود
            console.error("Élément #dynamic-skills-categories-container non trouvé!");
            return;
        }

        if (!dynamicSkillsContainer) return; // تأكد من وجود العنصر
            //the loading animation
                // Dynamically add jQuery first
      
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'assets/deadline/jquery.js';
    document.body.appendChild(jqueryScript);
    
    // When jQuery is loaded, add loader CSS and JS, then insert loader HTML
     jqueryScript.onload = () => {
        // Dynamically add CSS
        const loaderCss = document.createElement('link');
        loaderCss.rel = 'stylesheet';
        loaderCss.href = '/assets/deadline/deadline-loading.css';
        document.head.appendChild(loaderCss);

        // Dynamically add loader JS
        const loaderScript = document.createElement('script');
        loaderScript.src = '/assets/deadline/deadline-loading.js';
        document.body.appendChild(loaderScript);
        loaderScript.onload = () => {
        // Insert loader HTML
        fetch('/assets/deadline/deadline-loading.html')
            .then(response => response.text())
            .then(html => {
                dynamicSkillsContainer.innerHTML = html;
            });
        };
    };
        // عرض رسالة تحميل
        // dynamicSkillsContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400 col-span-full">Chargement des compétences...</p>';
 //await new Promise(resolve => setTimeout(resolve, 100000000000));
        try {
            const response = await fetch(`${BASE_API_URL}/api/skills/`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            const skills = await response.json();
            console.log("Données des compétences reçues:", skills);

            // 1. تجميع المهارات حسب الفئة
            const skillsByCategory = {};
            skills.forEach(skill => {
                // تأكد أن الـbackend يرسل اسم الفئة في 'category' (أو 'category_name' إذا كان هو اسم الحقل في الـserializer)
                // بناءً على models.py، يجب أن يكون 'category' إذا كنتِ تستخدمين StringRelatedField في serializer.
                // إذا كان لا يزال يرسل كائنًا أو ID، يجب تعديل الـserializer في الـbackend ليرسل الاسم.
                const categoryName = skill.category_name; 
                if (!skillsByCategory[categoryName]) {
                    skillsByCategory[categoryName] = [];
                }
                skillsByCategory[categoryName].push(skill);
            });

            // 2. مسح رسالة التحميل
            dynamicSkillsContainer.innerHTML = '';

            // 3. التحقق إذا كانت هناك مهارات للعرض
            if (Object.keys(skillsByCategory).length === 0) {
                dynamicSkillsContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400 col-span-full">Aucune compétence disponible pour le moment.</p>';
                return;
            }
             const preferredCategoryOrder = [
                "Frontend Skills",
                "Backend Skills",
                "Mobile Development",
                "Databases & Cloud",
                "Tools & Methodologies"
            ];

            // نحصل على أسماء جميع الكاتيجوريات الموجودة في البيانات
            let allCategoryNames = Object.keys(skillsByCategory);

            // نفرّق بين الكاتيجوريات المفضلة (اللي حطيناهم في الترتيب المخصص) والكاتيجوريات الجديدة
            let sortedCategoryNames = [];
            let otherCategoryNames = [];

            preferredCategoryOrder.forEach(pCategory => {
                if (allCategoryNames.includes(pCategory)) {
                    sortedCategoryNames.push(pCategory);
                }
            });

            allCategoryNames.forEach(categoryName => {
                if (!preferredCategoryOrder.includes(categoryName)) {
                    otherCategoryNames.push(categoryName);
                }
            });

            // نرتب الكاتيجوريات الجديدة أبجديًا (كيف ما تحبّي باش يجيو بعد الـTools)
            otherCategoryNames.sort(); 

            // ندمج القائمتين: الترتيب المفضل أولاً، ثم الكاتيجوريات الجديدة
            const finalCategoryOrder = sortedCategoryNames.concat(otherCategoryNames);

            // 4. إنشاء وعرض الـdivات لكل فئة ديناميكياً بترتيب الجديد
            finalCategoryOrder.forEach(categoryName => {
                if (skillsByCategory.hasOwnProperty(categoryName)) {
                    const categorySkills = skillsByCategory[categoryName];

                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'bg-white dark:bg-dark-700 p-6 rounded-lg shadow';

                    const categoryTitle = document.createElement('h3');
                    categoryTitle.className = 'text-xl font-semibold mb-4';
                    categoryTitle.textContent = categoryName;
                    categoryDiv.appendChild(categoryTitle);

                    const skillsListUl = document.createElement('ul');
                    skillsListUl.className = 'space-y-3';

                    // (اختياري) باش نرتبوا الـskills داخل كل category حسب الـname
                    categorySkills.sort((a, b) => a.name.localeCompare(b.name));

                    categorySkills.forEach(skill => {
                        skillsListUl.innerHTML += createSkillListItem(skill);
                    });

                    categoryDiv.appendChild(skillsListUl);
                    dynamicSkillsContainer.appendChild(categoryDiv);
                }
            });

        
   

        } catch (error) {
            console.error("Erreur lors de la récupération des compétences:", error);
            // عرض رسالة خطأ للمستخدم
            if (dynamicSkillsContainer) {
                dynamicSkillsContainer.innerHTML = `<p class="text-red-500 dark:text-red-400 text-center col-span-full">Échec du chargement des compétences. Veuillez réessayer plus tard.</p>`;
            }
        }
    }

    // ----------------------------------------------------
    // Appel des fonctions عند تحميل الصفحة
    // ----------------------------------------------------

    console.log("Le script main.js est en cours d'exécution!"); 
    
    fetchProjects(); 
    fetchSkills();   
 // Call fetchProjects and fetchSkills, then hide alert when done
    Promise.all([fetchProjects(), fetchSkills()]).finally(() => {
        hideLoadingAlert();
    });






});
