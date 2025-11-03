document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    // Çevrilecek öğeleri kapsayacak şekilde sorgu seçicisini genişletiyoruz
    const translatableElements = document.querySelectorAll('.translatable, [data-en], [data-tr]');
    let currentLang = localStorage.getItem('portfolioLang') || 'en'; // Varsayılan: İngilizce

    // Dil değişimini gerçekleştiren fonksiyon
    function updateContent(lang) {
        // HTML etiketindeki dil özniteliğini güncelle
        document.documentElement.lang = lang;
        
        // Tüm çevrilebilir öğeleri döngüye al
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            
            // Eğer elementte çeviri metni varsa
            if (translation) {
                const tagName = element.tagName.toLowerCase();
                
                if (tagName === 'title') {
                    document.title = translation;
                } 
                
                // Metin içeren etiketler: h, p, li, span
                else if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'p' || tagName === 'li' || tagName === 'span') {
                    
                    const link = element.querySelector('a');
                    const icon = element.querySelector('i');

                    // 1. Durum: Eleman bir link içeriyorsa (Sertifika/Proje Başlıkları)
                    if (link) {
                        // Sadece linkin içindeki metni güncelle, <a> etiketini koru
                        link.textContent = translation;
                    } 
                    // 2. Durum: Eleman bir ikon içeriyorsa (Konum/Email gibi)
                    else if (icon) {
                        // İkonu koru ve metni değiştir
                        element.innerHTML = `${icon.outerHTML} ${translation}`;
                    } 
                    // 3. Durum: Düz metin içeren öğeler
                    else {
                        element.textContent = translation; 
                    }
                }
                
                // Eğer eleman doğrudan bir <a> etiketi ise (Navigasyondaki linkler)
                else if (tagName === 'a') {
                     element.textContent = translation;
                }
            }
        });

        // Tuş üzerindeki metni güncelle
        langToggle.textContent = lang === 'en' ? 'TR' : 'EN';
        
        // Yerel depolamayı güncelle
        localStorage.setItem('portfolioLang', lang);
    }

    // Tuşa tıklandığında dili değiştir
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        updateContent(currentLang);
    });

    // Sayfa yüklendiğinde mevcut dili uygula
    updateContent(currentLang);

    // Go Up butonu mantığı
    const goUpBtn = document.getElementById('go-up-btn');

    // Sayfa kaydırıldığında butonu göster/gizle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // 300 piksel aşağı inince göster
            goUpBtn.style.display = 'flex';
        } else {
            goUpBtn.style.display = 'none';
        }
    });

    // Butona tıklandığında yumuşak bir şekilde yukarı kaydır
    goUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});