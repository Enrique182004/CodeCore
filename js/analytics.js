// CodeCore Google Analytics Configuration
// Measurement ID: G-XXYMYE4RHK

(function() {
    // Load Google Analytics gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXYMYE4RHK';
    document.head.appendChild(script);
    
    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXYMYE4RHK');
    
    console.log('Google Analytics initialized for CodeCore');
})();